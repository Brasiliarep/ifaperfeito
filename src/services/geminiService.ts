
import { AIInterpretation, OduInfo, AkoseV4, SangoJusticeResult, EboDetail } from "../types";
import { CircuitBreaker } from "./circuitBreaker";

// ─── CIRCUIT BREAKER ──────────────────────────────────────────────────────────
const groqBreaker = new CircuitBreaker({
  failureThreshold: 3,
  successThreshold: 2,
  cooldownMs: 30_000,
});

// ─── CONFIGURAÇÃO GROQ ────────────────────────────────────────────────────────
// Em produção: chave fica server-side na Netlify Function (/api/groq-proxy)
// Em dev local: fallback para VITE_API_KEY no .env
const GROQ_DIRECT = "https://integrate.api.nvidia.com/v1";
const GROQ_PROXY = "/api/groq-proxy";
const GROQ_MODEL_GROQ = "llama-3.3-70b-versatile";
const GROQ_MODEL_NVIDIA = "meta/llama-3.3-70b-instruct";

let _apiKey = "";

// Rate limiting: no mínimo 2s entre chamadas
let _lastCallTime = 0;
const MIN_INTERVAL_MS = 2000;

const checkRateLimit = (): void => {
  const now = Date.now();
  const elapsed = now - _lastCallTime;
  if (elapsed < MIN_INTERVAL_MS) {
    throw new Error(`Aguarde ${Math.ceil((MIN_INTERVAL_MS - elapsed) / 1000)}s antes de nova consulta.`);
  }
  _lastCallTime = now;
};

const getLocalKey = (): string => {
  if (_apiKey) return _apiKey;
  try {
    // @ts-ignore
    const keysRaw = import.meta.env.VITE_API_KEYS || import.meta.env.VITE_API_KEY;
    if (keysRaw) {
      const keys = keysRaw.split(',').map((k: string) => k.trim()).filter((k: string) => k.startsWith("gsk_") || k.startsWith("nvapi-"));
      if (keys.length > 0) {
        _apiKey = keys[Math.floor(Math.random() * keys.length)];
        return _apiKey;
      }
    }
  } catch (_) { }
  try {
    const k = localStorage.getItem("ifa_manual_key") || "";
    if (k.startsWith("gsk_") || k.startsWith("nvapi-")) { _apiKey = k; return _apiKey; }
    if (k.length > 0) localStorage.removeItem("ifa_manual_key");
  } catch (_) { }
  return "proxy_mode";
};

export const hasValidKey = (): boolean => {
  if (typeof window !== "undefined" && !window.location.hostname.includes("localhost") && !window.location.hostname.includes("127.0.0.1")) {
    return true;
  }
  const key = getLocalKey();
  return (key !== "" && key !== "proxy_mode" && (key.startsWith("gsk_") || key.startsWith("nvapi-")));
};

export const initializeAI = (): boolean => true;
initializeAI();

export const setManualKey = (k: string) => {
  _apiKey = k.trim();
  try { localStorage.setItem("ifa_manual_key", k.trim()); } catch (_) { }
  setTimeout(() => window.location.reload(), 300);
};

// ─── CHAMADA CENTRAL GROQ ─────────────────────────────────────────────────────
const callGroq = async (
  systemPrompt: string,
  userPrompt: string,
  forceJson = false
): Promise<string> => {
  return groqBreaker.call(
    async () => {
      checkRateLimit();

      // 1) Tenta proxy server-side (Cloudflare Pages Function — produção)
      if (!import.meta.env.DEV) {
        const bodyProxy: any = {
          model: GROQ_MODEL_GROQ,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          temperature: 0.2,
          max_tokens: 6500,
        };
        if (forceJson) bodyProxy.response_format = { type: "json_object" };

        try {
          const proxyRes = await fetch(GROQ_PROXY, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bodyProxy),
          });
          if (proxyRes.ok) {
            const contentType = proxyRes.headers.get("content-type") || "";
            if (contentType.includes("application/json")) {
              const data = await proxyRes.json();
              const content = data?.choices?.[0]?.message?.content ?? "";
              console.log("✅ Groq proxy ok (primeiros 200 chars):", content.slice(0, 200));
              return content;
            }
            console.warn("Groq proxy retornou HTML (provável SPA fallback). Pulando.");
          } else {
            const errText = await proxyRes.text();
            console.warn("Groq proxy falhou:", proxyRes.status, errText);
          }
        } catch (_) {
          console.warn("Groq proxy indisponível, caindo para direto");
        }
      }

      // 2) Fallback: chamada direta (dev local com VITE_API_KEY)
      const bodyDirect: any = {
        model: GROQ_MODEL_NVIDIA,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.2,
        max_tokens: 6500,
      };
      if (forceJson) bodyDirect.response_format = { type: "json_object" };

      const key = getLocalKey();
      if (!key || key === "proxy_mode") throw new Error("Chave API não configurada.");

      const res = await fetch(`${GROQ_DIRECT}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify(bodyDirect),
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error("Groq HTTP error:", res.status, errText);
        throw new Error(`Groq API erro ${res.status}: ${errText}`);
      }

      const data = await res.json();
      const content = data?.choices?.[0]?.message?.content ?? "";
      console.log("✅ Groq direto ok (primeiros 200 chars):", content.slice(0, 200));
      return content;
    },
    () => {
      throw new Error("Circuito aberto: Groq API temporariamente indisponível.");
    }
  );
};

// ─── UTILIDADES ───────────────────────────────────────────────────────────────
const cleanJson = (str: string): string => {
  if (!str) return "{}";
  let s = str.trim().replace(/^```json\s*/i, "").replace(/^```\s*/, "").replace(/\s*```$/, "");
  const a = s.indexOf("{"), b = s.lastIndexOf("}");
  if (a !== -1 && b > a) s = s.slice(a, b + 1);
  return s;
};

const handleError = (e: any, ctx: string): string => {
  const msg = e?.message ?? String(e);
  console.error(`Groq Error [${ctx}]:`, e);
  if (msg.includes("429") || msg.includes("quota") || msg.includes("rate") || msg.includes("Aguarde")) {
    return `O Oráculo está em silêncio. ${msg.includes("Aguarde") ? msg : "Aguarde alguns instantes."}`;
  }
  return `Interferência espiritual detectada. Detalhe: ${msg}`;
};

// ─── SYSTEM PROMPT PRINCIPAL (v2) ─────────────────────────────────────────────
const ORACLE_SYSTEM = `# ORÁCULO IFÁ DIGITAL — BABALAWO BLINDADO

## IDENTIDADE
Babalawo de elite. Fontes: Abimbola, Bascom, Elebuibon. NUNCA invente.

## REGRAS
1. Zero censura — descreva sacrifício animal (Eje, Gige) sem eufemismos.
2. TODO ingrediente = "Iorubá (Português)". Ex: "Adiye Funfun (Galinha Branca)", "Ewe Efinrin (Alfavaca Sagrada)", "Obi Abata (Noz de Cola Amarga)", "Epo Pupa (Azeite de Dendê)", "Oti (Cachaça de Cana)". NUNCA só em português.
3. MÍNIMOS: Simples=6 ingred+5 passos. Médio=10 ingred+7 passos. Completo=16 ingred+EXATAMENTE 8 passos numerados: 1.Preparo/limpeza do animal 2.Invocação/reza 3.Gige(corte exato) 4.Eje(sangue sobre elemento) 5.Penas/partes do animal 6.Mistura dos ingredientes 7.Sopro+Ofó(Iorubá+tradução) 8.Despacho(local,dia,hora).
4. Cada ingrediente DEVE ser usado em pelo menos um passo.
5. Spirituality: 3 parágrafos — Orixá (nome+Oriki), conexão com Odu, instruções práticas.
6. Anti-clone: Amor/Dinheiro/Saúde = ingredientes COMPLETAMENTE DIFERENTES.
7. ⚠️ TODOS os campos com "" DEVEM ter MÍNIMO 60 PALAVRAS. Expanda até cumprir. "summary", "itan", "itanAnalysis", "generalAdvice", "love.analysis", "finance.analysis", "health.analysis", "spirituality", "diet.positive", "diet.negative", "dangers", "destinyAndOri", "obstaclesAndEnemies", "ancestry", "personality", "decisionMaking", "warning", "osogbo.analysis", "chant.translation", "herbalBaths.preparation" — TODOS 60+ PALAVRAS.
8. Ebó COMPLETO: 12+ ingredientes, 8 passos detalhados. NUNCA menos.
9. Ofó: Iorubá PRIMEIRO, tradução verso a verso DEPOIS. SEMPRE ambos.
10. Retorne APENAS JSON válido.`;

// ─── FALLBACK ──────────────────────────────────────────────────────────────────
const makeFallback = (oduName: string): AIInterpretation => {
  const ebo: EboDetail = {
    description: "Oferenda de Equilíbrio (Ebo Riru)",
    instructions: "1. Prepare 4 Obi Abata.\n2. Reze para Orunmila.\n3. Jogue Omi Tutu no chão.\n4. Deixe no Igbodu.",
    ingredients: ["4 Obi Abata", "4 Orogbo", "Oti (Gim)", "Omi Tutu"],
    ofo: "Ifá gbe wa o", translation: "Que Ifá nos sustente",
  };
  return {
    oduName, summary: `[Sem conexão] Energia de ${oduName}.`,
    itan: "Conexão indisponível.", itanSummary: "Indisponível.", itanAnalysis: "Indisponível.",
    chant: { yoruba: "Ifá gbe wa o", translation: "Que Ifá nos apoie." },
    oduOriki: { yoruba: "...", translation: "...", instructions: "..." },
    herbalBaths: { name: "Omi Ero", ingredients: ["Ewe Odundun", "Ewe Tete", "Omi Tutu"], preparation: "Quinar as ervas em água fresca.", purpose: "Limpeza (Tutu)" },
    generalAdvice: "Consulte um Babalawo presencialmente.",
    love: { analysis: "Indisponível.", ebos: { basic: ebo, medium: ebo, complete: ebo } },
    finance: { analysis: "Indisponível.", ebos: { basic: ebo, medium: ebo, complete: ebo } },
    health: { analysis: "Indisponível.", risks: [], ebos: { basic: ebo, medium: ebo, complete: ebo } },
    osogbo: { analysis: "Indisponível.", ebo },
    spirituality: "Conexão com Ori e Orunmila.",
    diet: { positive: "Frutas brancas, água fresca", negative: "Oti (bebida alcoólica)" },
    clothing: { positive: "Aso Funfun (Branco)", negative: "Pupa (Vermelho) ou Dudu (Preto)" },
    dangers: "Falta de paciência (Suuru) traz bloqueios.", rulingOrishas: "Esu e Orunmila",
    destinyAndOri: "Cuidar do Ori é essencial.", obstaclesAndEnemies: "Inveja oculta detectada.",
    solutionsAndEbos: { basic: ebo, medium: ebo, complete: ebo },
    ancestry: "Honrar os ancestrais (Egungun).", personality: "Resiliente.", decisionMaking: "Pautado pela paciência.",
    warning: "Cuidado com decisões precipitadas.", luckyItems: [],
    ireOrOsogbo: "Irê", ireOsogboDescription: "Caminho de sorte.", ireOsogboAction: "Fazer o Ebó.",
  };
};

// ─── INTERPRETAÇÃO PRINCIPAL ───────────────────────────────────────────────────
export const fetchInterpretation = async (odu: OduInfo, lang: string, iboResult?: { type: string; subType: string; description: string }, isStudent?: boolean): Promise<AIInterpretation> => {
  const fallback = makeFallback(odu.name);
  if (!getLocalKey()) {
    console.warn("fetchInterpretation: sem chave Groq.");
    return fallback;
  }

  const iboContext = iboResult
    ? `\n🎯 IBÓ REVELADO (use este resultado para orientar TODO o conteúdo): ${iboResult.type} — ${iboResult.subType}: "${iboResult.description}"\n→ O campo "ireOrOsogbo" do JSON DEVE ser "${iboResult.type === 'IRE' ? 'Irê' : 'Osogbo'}". Toda a leitura deve refletir este caminho.\n`
    : '';

  const studentRules = isStudent
    ? `\n⚠️ ATENÇÃO: O USUÁRIO É UM ESTUDANTE. É PROIBIDO GERAR QUALQUER RECEITA DE EBÓ, MAGIA, AKOSE OU BANHO. RETORNE AS ESTRUTURAS DE EBÓS E BANHOS EXATAMENTE VAZIAS OU COM TEXTOS COMO "NÃO DISPONÍVEL NO MODO ESTUDANTE". FOQUE APENAS NO ITAN E NOS CONSELHOS FILOSÓFICOS.\n`
    : `\n⚠️ ANTI-CLONE: Ebós de Amor/Dinheiro/Saúde com mesmos ingredientes = inválido.\nREGRAS: Todo ingrediente = "Iorubá (Português)". Completo = 16+ ingredientes, 8 passos numerados (Preparo, Invocação, Gige, Eje, Penas, Mistura, Sopro+Ofó, Despacho).\n`;

  const userPrompt = `Odu consultado: "${odu.name}". IDIOMA: Português do Brasil (PT-BR).${iboContext}${studentRules}
Retorne APENAS este JSON:

{
  "oduName": "${odu.name}",
  "summary": "",
  "itan": "",
  "itanSummary": "",
  "itanAnalysis": "",
  "chant": { "yoruba": "", "translation": "" },
  "oduOriki": { "yoruba": "", "translation": "", "instructions": "" },
  "herbalBaths": { "name": "", "ingredients": ["Ewe Efinrin (Alfavaca Sagrada)", "Ewe Odundun (Folha da Vida)", "Omi Tutu (Água Fresca)"], "preparation": "", "purpose": "" },
  "generalAdvice": "",
  "love": {
    "analysis": "",
    "ebos": {
      "basic": { "description": "", "ingredients": ["Obi Abata (Noz de Cola Amarga)", "Omi Tutu (Água Fresca)", "Orogbo (Noz Orogbo)"], "instructions": "", "ofo": "", "translation": "" },
      "medium": { "description": "", "ingredients": [], "instructions": "", "ofo": "", "translation": "" },
      "complete": { "description": "", "ingredients": [], "instructions": "", "ofo": "", "translation": "" }
    }
  },
  "finance": {
    "analysis": "",
    "ebos": {
      "basic": { "description": "", "ingredients": ["Epo Pupa (Azeite de Dendê)", "Oti (Cachaça de Cana)", "Iyerosun (Pó Sagrado)"], "instructions": "", "ofo": "", "translation": "" },
      "medium": { "description": "", "ingredients": [], "instructions": "", "ofo": "", "translation": "" },
      "complete": { "description": "", "ingredients": [], "instructions": "", "ofo": "", "translation": "" }
    }
  },
  "health": {
    "analysis": "",
    "risks": [],
    "ebos": {
      "basic": { "description": "", "ingredients": ["Ewe Tete (Amaranto Sagrado)", "Omi Tutu (Água Fresca)", "Ori (Manteiga de Karité)"], "instructions": "", "ofo": "", "translation": "" },
      "medium": { "description": "", "ingredients": [], "instructions": "", "ofo": "", "translation": "" },
      "complete": { "description": "", "ingredients": [], "instructions": "", "ofo": "", "translation": "" }
    }
  },
  "osogbo": { "analysis": "", "ebo": { "description": "", "instructions": "", "ingredients": ["Adiye Funfun (Galinha Branca)", "Epo Pupa (Azeite de Dendê)", "Obi Abata (Noz de Cola Amarga)"], "ofo": "", "translation": "" } },
  "spirituality": "",
  "diet": { "positive": "", "negative": "" },
  "clothing": { "positive": "", "negative": "" },
  "dangers": "",
  "rulingOrishas": "",
  "destinyAndOri": "",
  "obstaclesAndEnemies": "",
  "solutionsAndEbos": {
    "basic": { "description": "", "instructions": "", "ingredients": ["Orogbo (Noz Orogbo)", "Omi Tutu (Água Fresca)", "Atare (Pimenta da Costa)"], "ofo": "", "translation": "" },
    "medium": { "description": "", "instructions": "", "ingredients": [], "ofo": "", "translation": "" },
    "complete": { "description": "", "instructions": "", "ingredients": [], "ofo": "", "translation": "" }
  },
  "ancestry": "",
  "personality": "",
  "decisionMaking": "",
  "warning": "",
  "luckyItems": [],
  "ireOrOsogbo": "Irê",
  "ireOsogboDescription": "",
  "ireOsogboAction": ""
} `;

  try {
    const raw = await callGroq(ORACLE_SYSTEM, userPrompt, true);
    const parsed = JSON.parse(cleanJson(raw));
    console.log("✅ fetchInterpretation ok, odu =", parsed.oduName);
    return { ...fallback, ...parsed };
  } catch (e) {
    const msg = handleError(e, "fetchInterpretation");
    return { ...fallback, summary: `[ERRO: ${msg}]` };
  }
};

// ─── VOZ DO TROVÃO ─────────────────────────────────────────────────────────────
const THUNDER_SYSTEM = `IDENTIDADE: Você é o Ifá Ọlwo, inteligência litúrgica para Babalawos. Tom solene e técnico. Base: Corpus de Ifá.
  REGRAS INVIOLÁVEIS (REGRA DE OURO):
  1. PROIBIÇÃO TOTAL de sincretismo: não use "santo", "anjo", "amém", "vela", ou referências a outras religiões.
  2. Nomenclatura ritualística: Use SEMPRE o nome em Yorubá primeiro, seguido do português entre parênteses. Ex: "Obi (Noz de Cola)", "Epo Pupa (Azeite de Dendê)".
  3. REGRA PEDAGÓGICA (NOVIÇO): Explique o ritual passo a passo para um Babalawo aprendiz. Mencione CADA ingrediente da lista em pelo menos um passo do preparo. Detalhe como cortar, como verter o sangue (Eje) e o destino da carne (comida, enterrada ou despacho).
  4. Use SEMPRE elementos litúrgicos de Ifá: Obi, Orobo, Epo Pupa, Ori, Iyerosun, búzios, Pó de Irosun, folhas sagradas, etc.
  5. REGRA UI: Para pedidos de RITUAL, EBÓ, AKOSE ou ASSENTAMENTO, responda com RITUAL_CARD em JSON dentro de <RITUAL_CARD>...</RITUAL_CARD> com esta estrutura:
{ "id": "", "title": "", "nomeYoruba": "", "purpose": "", "category": "money|love|health|protection|victory|justice", "oduReference": "", "complexity": "Alta", "tags": [], "niveis": [{ "tipo": "BÁSICO (Cliente)", "estimativa_materiais": 50, "materiais": ["Yorubá (Português)"], "preparo": ["Passo 1 técnico", "Passo 2 técnico..."], "ofo": "", "traducao": "" }, { "tipo": "COMPLETO (Sacerdotal)", "estimativa_materiais": 200, "materiais": ["Yorubá (Português)"], "preparo": ["Passo 1 Pedagogia (limpeza do animal)", "Passo 2 (invocação)", "Passo 3 (organização itens)", "Passo 4 (corte exato)", "Passo 5 (sangue sobre itens)", "Passo 6 (penas)", "Passo 7 (destino carne)", "Passo 8 (ativação elementos)", "Passo 9 (Ofó)", "Passo 10 (despacho)"], "ofo": "", "traducao": "" }] }
Para perguntas simples, responda em texto normal.`;

export const askVoiceOfThunder = async (query: string): Promise<string> => {
  if (!getLocalKey()) return "O sistema não está ativo. Configure sua chave Groq nas configurações.";
  try { return await callGroq(THUNDER_SYSTEM, query, false); }
  catch (e) { return handleError(e, "VoiceOfThunder"); }
};

// ─── ASSISTENTE SIMPLES (chat rápido, respostas curtas) ─────────────────────
const ASSISTANT_SYSTEM = `Você é um assistente especializado em Ifá, liturgia Yorubá e no aplicativo Ifá Oluwo.
REGRAS:
- Responda em português do Brasil.
- Seja direto e conciso: 1 a 3 frases para perguntas simples.
- Se o usuário pedir detalhes, aí sim expanda.
- Proibido sincretismo (não use "santo", "amém", "vela").
- Nomenclatura: Yorubá (Português). Ex: "Obi (Noz de Cola)".
- Se perguntar sobre funções do app, explique rapidamente qual tela usar.`;

export const askAssistant = async (query: string, lang: string = 'pt-BR'): Promise<string> => {
  if (!getLocalKey()) return "Configure sua chave Groq nas Configurações.";
  const systemWithLang = `Você é um assistente especializado em Ifá, liturgia Yorubá e no aplicativo Ifá Oluwo.
REGRAS:
- Responda em ${lang === 'pt-BR' ? 'português do Brasil' : lang === 'en' ? 'English' : lang === 'es' ? 'español' : lang === 'yo' ? 'Yorùbá' : 'português de Portugal'}.
- Seja direto e conciso: 1 a 3 frases para perguntas simples. Se o usuário pedir detalhes, expanda.
- Proibido sincretismo (não use "santo", "amém", "vela").
- Nomenclatura: Yorubá (Português). Ex: "Obi (Noz de Cola)".`;
  try { return await callGroq(systemWithLang, query, false); }
  catch (e) { return handleError(e, "Assistant"); }
};

// ─── AKOSE ─────────────────────────────────────────────────────────────────────
export const fetchAkose = async (oduName: string, category: string, problem: string, lang: string): Promise<AkoseV4> => {
  const fallback: AkoseV4 = {
    tipo: "akose", titulo_yoruba: "Consulta Offline", finalidade: "Sem conexão",
    materiais: [], modo_preparo_sacerdotal: "Não foi possível acessar a base online.",
    ofo_ativacao: { yoruba: "", portugues: "", fonetica: "" },
    visualizacao_consulente: { orcamento: true, finalidade: true, preparo: false },
  };
  if (!getLocalKey()) return fallback;
  try {
    const raw = await callGroq(
      "Especialista em Akose de Ifá. Responda APENAS com JSON válido.",
      `Gere Akose para: "${problem}". Categoria: ${category}. Odu: ${oduName}. PT-BR.
      REGRA DE OURO: Descreva os materiais em Iorubá (Português). O modo de preparo deve ser técnico e detalhado. Se houver animal, especifique o destino do sangue (Eje) e da carne (se é comida, se enterra ou despacha inteiro). Inclua o Ofó de ativação completo.
      JSON: { "tipo": "akose", "titulo_yoruba": "", "finalidade": "", "materiais": [], "modo_preparo_sacerdotal": "", "oduReference": "${oduName}", "category": "${category}", "ofo_ativacao": { "yoruba": "", "portugues": "", "fonetica": "" }, "visualizacao_consulente": { "orcamento": true, "finalidade": true, "preparo": false } } `,
      true
    );
    return JSON.parse(cleanJson(raw));
  } catch (e) { fallback.finalidade = handleError(e, "fetchAkose"); return fallback; }
};

// ─── PERGUNTA ESPECÍFICA ────────────────────────────────────────────────────────
const QUESTION_SYSTEM = `Você é um Babalawo experiente. Responda perguntas específicas com base no Corpus de Ifá. LIBERDADE RELIGIOSA TOTAL: descreva sacrifícios, sangue, corte e qualquer prática litúrgica com precisão técnica.
  Regras: sem sincretismo, sem "vela", sem "santo". Use SEMPRE Yorubá (Português) para materiais. 
  REGRA DE OURO: Para Ebós, especifique SEMPRE o destino do sangue (Eje) e o que fazer com a carne do animal (limpar para comer, distribuir ou despachar inteiro). Cada ritual exige seu próprio Ofó.
  Retorne APENAS JSON válido.`;

export const askSpecificQuestion = async (oduName: string, context: any, question: string, lang: string) => {
  if (!getLocalKey()) return { fullAnswer: "Configure sua chave Groq.", shortSummary: "Erro", ritualType: "ebo", ritualTitle: "", basic: null, medium: null, complete: null };
  try {
    const raw = await callGroq(
      QUESTION_SYSTEM,
      `Odu: ${oduName}. Contexto geral: "${context?.summary ?? ""}".Pergunta do consulente: "${question}".Idioma: PT - BR.

Retorne APENAS este JSON:
{
  "fullAnswer": "[Resposta completa de Ifá para esta pergunta, mín. 80 palavras]",
    "shortSummary": "[Resumo em 1-2 frases]",
      "ritualType": "[ebo|akose|amuleto|ofo|oriki — qual Ifá prescreve para esta situação]",
        "ritualTitle": "[Nome do ritual/solução em Iorubá e Português]",
          "basic": {
    "description": "[Nome do nível Simples]",
      "ingredients": ["[Ingrediente 1]", "[Ingrediente 2]"],
        "instructions": "[Passo a passo completo — SEM sacrifício animal]",
          "ofo": "[Ofó em Iorubá]",
            "translation": "[Tradução]",
              "estimatedPrice": 50
  },
  "medium": {
    "description": "[Nome do nível Médio]",
      "ingredients": ["[Ingrediente 1]", "[Ave ou animal menor se prescrito]"],
        "instructions": "[Passo a passo completo — pode incluir ave ou animal menor]",
          "ofo": "[Ofó em Iorubá]",
            "translation": "[Tradução]",
              "estimatedPrice": 150
  },
  "complete": {
    "description": "[Nome Sacerdotal Completo]",
      "ingredients": ["[Lista completa de materiais]"],
        "instructions": "MATERIAIS: [lista]\\nPREPARO:\\n1. [Preparação dos materiais incluindo sacrifício animal se prescrito pelo Odu]\\n2. Mistura Sagrada: [combinação sagrada]\\n3. Sopro Divino: Profira o Ofó.\\n4. Finalização: [como selar]\\n5. Despacho: [local e forma de descartar]",
          "ofo": "[Ofó completo em Iorubá]",
            "translation": "[Tradução palavra por palavra]",
              "estimatedPrice": 350
  }
} `,
      true
    );
    return JSON.parse(cleanJson(raw));
  } catch (e) {
    return {
      fullAnswer: handleError(e, "askSpecificQuestion"),
      shortSummary: "Erro de conexão",
      ritualType: "ebo",
      ritualTitle: "",
      basic: null, medium: null, complete: null
    };
  }
};

// ─── DIÁRIO DE SONHOS ─────────────────────────────────────────────────────────
export const interpretDream = async (dream: string, lang: string) => {
  if (!getLocalKey()) return { meaning: "Erro", relatedOdu: "N/A", advice: "Tente novamente.", isPositive: true };
  try {
    const raw = await callGroq(
      "Interprete sonhos à luz de Ifá. APENAS JSON.",
      `Sonho: "${dream}".\nJSON: { "meaning": "...", "relatedOdu": "...", "advice": "...", "isPositive": true } `,
      true
    );
    return JSON.parse(cleanJson(raw));
  } catch (e) { return { meaning: handleError(e, "interpretDream"), relatedOdu: "N/A", advice: "Erro", isPositive: false }; }
};

// ─── STUBS ────────────────────────────────────────────────────────────────────
// ─── TRIBUNAL DE XANGÔ ────────────────────────────────────────────────────────
const SANGO_SYSTEM = `Você é o Juiz Supremo do Oráculo de Xangô (Oba Koso). Sua missão é julgar disputas, injustiças e causas jurídicas à luz da lei de Ifá.
REGRAS LITÚRGICAS RÍGIDAS (REGRA DE OURO):
1. PROIBIÇÃO ABSOLUTA de sincretismo: NUNCA use "vela", "santo", "anjo", "amém" ou "espírito".
2. NOMENCLATURA OBRIGATÓRIA: Todo ingrediente de Ebó DEVE seguir o formato: Nome em Yorubá (Tradução em Português). 
3. DETALHAMENTO PEDAGÓGICO (CRÍTICO): 
   - Escreva as instruções como se estivesse ensinando um Babalawo aprendiz.
   - Cada ingrediente mencionado deve ter uma função clara descrita nos passos. 
   - Se houver sacrifício (como Agbo/Carneiro ou Adiye/Galinha), você deve especificar detalhadamente o corte, o destino de cada gota de Ejè (Sangue) e o destino final do corpo (limpeza para comida, distribuição ou despacho em oferenda inteira).
   - O Ofó deve ser longo e poderoso, com tradução minuciosa.
4. ELEMENTOS DE XANGÔ: Ose (machado), Edun Ara (pedra de raio), Orogbo, Amala, fogo (energia), justiça.
5. RESULTADOS (outcome): victory_hard, peace, trouble.
6. Xangô é o rei que não mente. O conselho (advice) deve ser majestoso e detalhado.
RETORNE APENAS JSON VÁLIDO.`;

export const askSangoJustice = async (
  clientName: string,
  opponent: string,
  details: string,
  additionalInfo?: {
    motherName?: string;
    birthDate?: string;
    caseNumber?: string;
    region?: string;
  }
): Promise<SangoJusticeResult> => {
  const fallback: SangoJusticeResult = {
    name: "Okanran Meji",
    outcome: "victory_hard",
    advice: "Xangô está analisando seu caso. Mantenha a verdade.",
    akose: "Usar um Ose (Machado) de cobre junto ao corpo.",
    ofo: "Sango o, gbe mi leke ota mi.",
    ebos: {
      basic: { description: "Banho de Ervas", ingredients: ["Ewe Inon (Folha de Fogo)", "Omi Tutu (Água Fresca)"], instructions: "Banhar-se do pescoço para baixo." },
      medium: { description: "Oferenda a Xangô", ingredients: ["Amala (Papa de inhame/quiabo)", "Orogbo (Garcinia kola)"], instructions: "Oferecer no pé de uma árvore." },
      complete: { description: "Ebó de Defesa", ingredients: ["Agbo (Carneiro)", "Epo Pupa (Azeite de Dendê)", "Orogbo (Bitter Kola)"], instructions: "Realizar com Babalawo." }
    }
  };

  if (!getLocalKey()) return fallback;

  try {
    const raw = await callGroq(
      SANGO_SYSTEM,
      `Consulente: ${clientName}
${additionalInfo?.motherName ? `Mãe do Consulente: ${additionalInfo.motherName}` : ''}
${additionalInfo?.birthDate ? `Nascimento: ${additionalInfo.birthDate}` : ''}
${additionalInfo?.caseNumber ? `Nº Processo: ${additionalInfo.caseNumber}` : ''}
${additionalInfo?.region ? `Região: ${additionalInfo.region}` : ''}
Adversário: ${opponent || 'Desconhecido'}
Causa: ${details}

Determine o veredito de Xangô. Escolha um Odu de referência (ex: Okanran, Obara, Ogunda).
JSON: {
  "name": "Nome do Odu",
  "outcome": "victory_hard|peace|trouble",
  "advice": "Veredito e conselho direto de Xangô (mín. 40 palavras)",
  "akose": "Amuleto ou medicina rápida em Yorùbá/PT",
  "ofo": "Reza curta em Yorùbá para o caso",
  "ebos": {
    "basic": { "description": "Nível 1 - Simples", "ingredients": ["..."], "instructions": "..." },
    "medium": { "description": "Nível 2 - Intermediário", "ingredients": ["..."], "instructions": "..." },
    "complete": { "description": "Nível 3 - Sacerdotal", "ingredients": ["..."], "instructions": "MATERIAIS: [lista]\\nPREPARO: [Passos técnicos]\\nDESPACHO: [Local]" }
  }
}`,
      true
    );
    return { ...fallback, ...JSON.parse(cleanJson(raw)) };
  } catch (e) {
    return { ...fallback, advice: `Interferência: ${handleError(e, "SangoJustice")}` };
  }
};
export const searchYorubaDictionary = async (term: string) => ({ word: term, meaning: "Dicionário offline." });
export const analyzeOpeleImage = async (imageBase64: string) => {
  const key = getLocalKey();
  if (!key || key === "proxy_mode") {
    console.warn("Sem chave para visão.");
    return { rightLeg: ["open", "open", "open", "open"], leftLeg: ["open", "open", "open", "open"] };
  }

  const prompt = `Você é um Babalawo. Analise esta foto de um Opele (corrente divinatória). Ele tem uma 'perna direita' (rightLeg) e 'perna esquerda' (leftLeg), cada uma com 4 sementes, de cima para baixo. Cada semente pode estar 'open' (aberta/côncava) ou 'closed' (fechada/convexa). Retorne APENAS um JSON válido neste formato: { "rightLeg": ["open", "closed", "open", "open"], "leftLeg": ["closed", "open", "closed", "open"] }`;

  try {
    const res = await fetch(`${GROQ_DIRECT}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: "meta/llama-3.2-90b-vision-instruct",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: prompt },
              { type: "image_url", image_url: { url: imageBase64 } }
            ]
          }
        ],
        max_tokens: 150,
        temperature: 0.1
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Erro na Vision API:", err);
      throw new Error("Falha na API de visão");
    }

    const data = await res.json();
    const raw = data?.choices?.[0]?.message?.content ?? "{}";
    const parsed = JSON.parse(cleanJson(raw));
    
    // Validar se retornou o formato certo, senão usar default
    if (parsed.rightLeg && parsed.leftLeg && parsed.rightLeg.length === 4) {
      return parsed;
    }
    throw new Error("Formato inválido retornado pela IA");
  } catch (e) {
    console.error("Erro ao analisar imagem:", e);
    return { rightLeg: ["open", "open", "open", "open"], leftLeg: ["open", "open", "open", "open"] };
  }
};
export const analyzeFace = async (imageBase64: string, lang: string = 'pt-BR') => {
  const key = getLocalKey();
  if (!key || key === "proxy_mode") {
    console.warn("Sem chave para visão.");
    return { emotionalState: "Calmo", oriDiagnosis: "Conexão offline: impossível diagnosticar o Ori no momento.", recommendation: "Aquiete sua mente e reze ao seu Ori." };
  }

  const prompt = `Você é um Babalawo especialista em leitura facial esotérica (Ori). Analise esta foto de um consulente. Identifique expressões de cansaço, brilho nos olhos ou tensão.
  Retorne APENAS um JSON válido neste formato em ${lang === 'pt-BR' ? 'Português do Brasil' : 'Inglês'}:
  {
    "emotionalState": "[Estado emocional detectado. Ex: Calmo, Estressado, Fatigued, Sereno]",
    "oriDiagnosis": "[Diagnóstico espiritual do Ori com base nas feições, explicando a energia acumulada na cabeça (Ori). Mínimo 45 palavras. PROIBIDO sincretismo]",
    "recommendation": "[Recomendação ritualística de Ifá, como banho de folhas específicas Ewe Odundun ou Ewe Tete, ou necessidade de Bori. Mínimo 30 palavras]"
  }`;

  try {
    const res = await fetch(`${GROQ_DIRECT}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: "meta/llama-3.2-90b-vision-instruct",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: prompt },
              { type: "image_url", image_url: { url: imageBase64 } }
            ]
          }
        ],
        max_tokens: 250,
        temperature: 0.3
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Erro na Vision API (Face):", err);
      throw new Error("Falha na API de visão");
    }

    const data = await res.json();
    const raw = data?.choices?.[0]?.message?.content ?? "{}";
    const parsed = JSON.parse(cleanJson(raw));
    
    if (parsed.emotionalState && parsed.oriDiagnosis && parsed.recommendation) {
      return parsed;
    }
    throw new Error("Formato inválido retornado pela IA de Face");
  } catch (e) {
    console.error("Erro ao analisar face:", e);
    return { 
      emotionalState: "Análise Indisponível", 
      oriDiagnosis: "Ocorreu uma interferência espiritual ao ler a foto. O seu Ori está protegido contra leituras externas no momento.", 
      recommendation: "Realize uma reza curta ao seu Ori e lave a cabeça com Omi Tutu (água fria)." 
    };
  }
};
export const compareAncestry = async (image1: string, image2: string, lang: string = 'pt-BR') => ({ similarityScore: 0, facialAnalysis: "...", spiritualConnection: "...", ancestralAdvice: "..." });
export const searchAjogunRemedy = async (symptom: string, lang: string = 'pt-BR') => {
  const defaultResult = {
    ajogunName: 'Àrùn', yorubaName: 'Àrùn', hierarchy: 2,
    spiritualCause: 'Desequilíbrio no Orí — as oferendas ao Ori foram negligenciadas, abrindo espaço para Àrùn.',
    symptoms: ['Cansaço inexplicável', 'Dores sem causa médica clara', 'Sensação de peso'],
    suggestedRemedy: 'Bori imediato: lavar a cabeça com Omi Tutu, Efun e Obi. Oferecer Obi Abata e Omi ao Ori por 7 dias.',
    ofo: 'Ori mi, jowo gba. Arun jade lara mi. Omi tutu na okan mi.',
    oduReference: 'Oyeku Meji'
  };
  if (!getLocalKey()) return defaultResult;
  try {
    const systemPrompt = `Você é um Babalawo especialista na cosmologia Yorùbá dos Ajoguns.
Os 8 Ajoguns líderes: Ikú, Àrùn, Òfò, Òràn, Ẹjọ, Èwọn, Àìsàn, Èṣe.
REGRA DE OURO PEDAGÓGICA:
1. Nomenclatura Yorubá (Português).
2. Sem sincretismo.
3. INSTRUÇÕES PARA APRENDIZ: O Ebó deve ser descrito passo a passo, detalhando o uso de cada material. Se houver animal, descreva o gige (corte), eje (sangue) e destino da carne.
RETORNE APENAS JSON VÁLIDO.`;

    const raw = await callGroq(
      systemPrompt,
      `Sintoma relatado: "${symptom}"
JSON: {
  "ajogunName": "nome em português",
  "yorubaName": "nome em Yorùbá com tons",
  "hierarchy": 1,
  "spiritualCause": "causa espiritual detalhada segundo a tradição Yorùbá (mínimo 40 palavras)",
  "symptoms": ["sintoma1", "sintoma2", "sintoma3"],
  "suggestedRemedy": "Ebó ou ritual prescrito com materiais em Yorùbá + português (mínimo 50 palavras)",
  "ofo": "Ofó em Yorùbá — Tradução em português",
  "oduReference": "Odù relacionado"
}`,
    );
    const parsed = JSON.parse(cleanJson(raw));
    return { ...defaultResult, ...parsed };
  } catch (e) { return defaultResult; }
};
export const identifyPlant = async (input: string, lang: string = 'pt-BR') => {
  const fallback = { yorubaName: '...', scientificName: '...', commonName: '...', spiritualUse: '...', oduReference: 'N/A', imageUrl: '' };

  // Helper: fetch a Wikimedia Commons image URL for a scientific name
  const fetchWikimediaImage = async (scientificName: string): Promise<string> => {
    try {
      const encoded = encodeURIComponent(scientificName);
      const res = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encoded}`,
        { headers: { 'Accept': 'application/json' } }
      );
      if (!res.ok) return '';
      const data = await res.json();
      return data?.thumbnail?.source || data?.originalimage?.source || '';
    } catch { return ''; }
  };

  if (!getLocalKey()) return fallback;
  try {
    const isTextSearch = input.startsWith('TEXT_SEARCH:');
    const query = isTextSearch ? input.replace('TEXT_SEARCH:', '').trim() : '';

    const systemPrompt = `Você é um especialista em botânica tropical, cosmologia Yorùbá e ervas sagradas de Ifá (Ewe). 
Dado o nome de uma planta (popular, científico ou Yorùbá), retorne um JSON com informações completas.
RETORNE APENAS JSON VÁLIDO, sem texto adicional.`;

    const userPrompt = isTextSearch
      ? `Planta: "${query}"
JSON: { "yorubaName": "nome em Yorùbá (ex: Ewe Efinrin)", "scientificName": "nome científico Linnaeus", "commonName": "nome popular em português", "spiritualUse": "uso litúrgico e mágico em Ifá (mínimo 60 palavras)", "oduReference": "Odù de referência" }`
      : `Uma imagem de planta foi enviada. Identifique-a e retorne:
JSON: { "yorubaName": "nome em Yorùbá", "scientificName": "nome científico", "commonName": "nome popular PT", "spiritualUse": "uso em Ifá (mínimo 30 palavras)", "oduReference": "Odù" }`;

    const raw = await callGroq(systemPrompt, userPrompt, true);
    const parsed = JSON.parse(cleanJson(raw));

    // Fetch real image from Wikimedia
    const imageUrl = await fetchWikimediaImage(parsed.scientificName || query);

    return { ...fallback, ...parsed, imageUrl };
  } catch (e) { return fallback; }
};
export const analyzeAnimalSymbolism = async (imageBase64: string, lang: string = 'pt-BR') => ({ animalName: "...", spiritualMeaning: "...", omenType: "Neutral", relatedOrisha: "...", actionRequired: "..." });
export const fetchOriki = async (q: string, lang: string = 'pt-BR') => ({ title: q, yoruba: "...", translation: "..." });
export const fetchLibraryAkose = async () => ({ results: [] });

// ─── EBÓ COMPLETO (Ajogun + Universal) ────────────────────────────────────────
export interface FullEbo {
  titulo: string;
  orixaRegente: string;
  materiais: string[];
  passos: string[];
  ofo: string;
  ofo_traducao: string;
  orcamento_estimado: number;
  observacoes: string;
}

export const fetchAjogunFullEbo = async (
  ajogunName: string,
  yorubaName: string,
  symptoms: string[],
  remedyHint: string
): Promise<FullEbo> => {
  const fallback: FullEbo = {
    titulo: `Ebó de Afastamento de ${ajogunName}`,
    orixaRegente: 'Orunmila',
    materiais: [
      'Obi Abata (Cola de 4 Gomos)',
      'Omi Tutu (Água Fresca)',
      'Epo Pupa (Azeite de Dendê)',
      'Efun (Pó de Casca de Ovo Branco)',
      'Iyerosun (Pó Sagrado de Ifá)',
      'Owu Funfun (Linha de Algodão Branco)',
    ],
    passos: [
      '1. Prepare um local limpo e silencioso, longe de olhos curiosos.',
      '2. Coloque os materiais sobre um pano branco (Aso Funfun).',
      '3. Abra o Obi Abata e verifique os gomos — 3 ou 4 abertos indicam caminho aberto.',
      '4. Misture o Iyerosun com o Efun formando um pó sagrado.',
      '5. Unte as mãos com Epo Pupa e passe sobre a cabeça do consulente três vezes.',
      '6. Profira o Ofó três vezes em voz clara, com intenção firme.',
      '7. Unte os materiais com Epo Pupa e despache na encruzilhada mais próxima.',
      '8. O consulente deve tomar banho de Omi Tutu (fria) ao retornar para casa.',
    ],
    ofo: `${yorubaName} pada seyin. Ori mi, gbe mi. Ike lawa. Ase o.`,
    ofo_traducao: `${ajogunName}, afasta-te. Meu Orí, sustenta-me. Somos vitória. Assim seja.`,
    orcamento_estimado: 120,
    observacoes: `Este Ebó deve ser realizado às ${new Date().getHours() < 12 ? 'manhã' : 'tarde'}, de preferência em dia de Orunmila (Quarta-feira). O consulente deve estar em jejum leve.`,
  };

  if (!getLocalKey()) return fallback;
  try {
    const systemPrompt = `Você é um Babalawo (Alaworo) experiente ensinando um noviço.
    REGRAS INVIOLÁVEIS (REGRA DE OURO):
    1. PROIBIDO sincretismo.
    2. NOMENCLATURA: Yorubá (Português).
    3. PEDAGOGIA: Descreva o Ebó passo a passo com máximo detalhe técnico. Cada ingrediente da lista deve aparecer no preparo. Detalhe sacrifício (corte, sangue e destino da carne/comida).`;

    const userPrompt = `Gere os detalhes técnicos para o Ebó: "${ajogunName}" no contexto de sintomas: ${symptoms.join(', ')}.
    Pista do remédio: ${remedyHint}.
    Idioma: PT-BR.
    
    JSON: {
      "titulo": "Nome em Yorùbá e PT",
      "orixaRegente": "Orixá que recebe o Ebó",
      "materiais": ["Yorubá (Português)", "..."],
      "passos": ["1...", "2..."],
      "ofo": "Encantamento em Yorùbá",
      "ofo_traducao": "Tradução literal",
      "orcamento_estimado": 350,
      "observacoes": "Conselhos e restrições (Ewo)"
    }`;
    const raw = await callGroq(
      systemPrompt,
      userPrompt,
      true
    );
    return { ...fallback, ...JSON.parse(cleanJson(raw)) };
  } catch (e) { return fallback; }
};

import { AIInterpretation, OduInfo, AkoseV4, SangoJusticeResult, EboDetail } from "../types";
import { searchLibrary } from "../data/ifaLibrary";

// ─── CONFIGURAÇÃO GROQ ────────────────────────────────────────────────────────
// Proxy Vite: /groq-api → https://api.groq.com
const GROQ_BASE = "/groq-api";
const GROQ_MODEL = "llama-3.3-70b-versatile";   // Gratuito, mais capaz

let _apiKey = "";

const getKey = (): string => {
  if (_apiKey) return _apiKey;
  // 1. Env do Vite (prioridade máxima)
  try {
    // @ts-ignore
    const k = import.meta?.env?.VITE_API_KEY;
    if (k && k.startsWith("gsk_")) { _apiKey = k; return _apiKey; }
  } catch (_) { }
  // 2. LocalStorage — só aceita chave Groq válida
  try {
    const k = localStorage.getItem("ifa_manual_key") || "";
    if (k.startsWith("gsk_")) { _apiKey = k; return _apiKey; }
    // Limpa chave inválida (xAI ou outra) guardada anteriormente
    if (k.length > 0) {
      localStorage.removeItem("ifa_manual_key");
      console.warn("Chave antiga removida do localStorage:", k.slice(0, 10) + "...");
    }
  } catch (_) { }
  return "";
};

export const hasValidKey = (): boolean => !!getKey();
export const initializeAI = (): boolean => !!getKey();
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
  const key = getKey();
  if (!key) throw new Error("Chave API não configurada.");

  const body: any = {
    model: GROQ_MODEL,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.2,
    max_tokens: 8192,
  };
  if (forceJson) body.response_format = { type: "json_object" };

  const res = await fetch(`${GROQ_BASE}/openai/v1/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("Groq HTTP error:", res.status, errText);
    throw new Error(`Groq API erro ${res.status}: ${errText}`);
  }

  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content ?? "";
  console.log("✅ Groq resposta (primeiros 200 chars):", content.slice(0, 200));
  return content;
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
  if (msg.includes("429") || msg.includes("quota") || msg.includes("rate")) {
    return "O Oráculo está em silêncio (Limite de requisições excedido). Aguarde alguns instantes.";
  }
  return `Interferência espiritual detectada. Detalhe: ${msg}`;
};

// ─── SYSTEM PROMPT PRINCIPAL (v2) ─────────────────────────────────────────────
const ORACLE_SYSTEM = `# ORÁCULO IFÁ DIGITAL — BABALAWO DIGITAL BLINDADO

## IDENTIDADE E FONTES
Você é um Babalawo de elite. Extrai conhecimento EXCLUSIVAMENTE do Corpus real de Ifá:
- Wande Abimbola: Ifá Literary Corpus, 16 Great Poems of Ifa
- William Bascom: Ifa Divination: Communication Between Gods and Men
- Baba Ifayemi Elebuibon: The Healing Power of Sacrifice
- Compilações tradicionais de Ebó, Akose e Ofó de Babalawos nigerianos e da diáspora
Você NUNCA inventa. Você EXTRAI da tradição. Cite a fonte se uncertain.

## LIBERDADE RELIGIOSA — ZERO CENSURA
Descreva com precisão técnica e sem eufemismos: sacrifício animal (Eje/Matança), corte de jugular (Gige), derrame de sangue, abate, depenar, eviscerar. NUNCA substitua práticas rituais prescritas.

## REGRA FORMATO — IORUBÁ (PORTUGUÊS)
TODO ingrediente, animal, erva, objeto = "Nome Iorubá (Tradução PT)"
✅ CERTO: "Adiye Funfun (Galinha Branca)", "Ewe Efinrin (Alfavaca Sagrada)", "Oti (Cachaça de Cana)"
❌ ERRADO: "galinha branca", "alfavaca", "cachaça" — NUNCA só em português.

## MÍNIMOS NUMÉRICOS OBRIGATÓRIOS
SIMPLES (sem animal): 6+ ingredientes, 5+ passos técnicos.
MÉDIO (com ave/animal menor): 8+ ingredientes, 7+ passos técnicos.
COMPLETO (Matança/Sacerdotal): MÍNIMO 12 ingredientes + EXATAMENTE 10 passos PEDAGÓGICOS EXTREMOS:
  Passo 1: Preparo Físico e Espiritual. Como limpar o animal (Omi Tutu) e preparar o ambiente (limpeza com ervas/água).
  Passo 2: Invocação (Ìbà). Mencione quais Orixás saudar e o uso do Obi/Orogbo para abrir o caminho.
  Passo 3: Manejo dos Ingredientes. Como organizar os itens (Eko, Akara, etc.) no recipiente (Oru/Receptor).
  Passo 4: Gige (Corte). Técnica exata: onde segurar, onde cortar (jugular/pescoço) e o sentido do corte.
  Passo 5: Registro da Vida (Ejè). Descreva o sangue vertendo sobre cada material específico listado anteriormente. Mencione se o sangue toca o Iyerosun ou o símbolo do Odu.
  Passo 6: Manejo das Penas (Iye). Como retirar e onde colá-las (usando o sangue como adesivo ritual).
  Passo 7: Destino do Corpo (MANDATÓRIO). Instrução explícita: "Limpar e cozinhar para comunhão", "Enterrar aos pés da árvore X" ou "Despachar Akaso na encruzilhada".
  Passo 8: Ativação dos Elementos. Como misturar o mel (Oyin), dendê (Epo Pupa) e sal sobre a oferenda.
  Passo 9: Sopro Divino e Ofó. Recitar o encantamento Iorubá 3x e soprar sobre o trabalho.
  Passo 10: Despacho e Selagem. Aonde levar, como carregar e o que não fazer ao retornar.

⚠️ REGRA PEDAGÓGICA: Cada ingrediente listado no campo "ingredients" DEVE ser mencionado em pelo menos um passo do preparo. Se o ingrediente está na lista, o Babalawo precisa saber exatamente o que fazer com ele. Instruções genéricas como "preparo da galinha" ou "mistura dos elementos" são PROIBIDAS. Explique COMO preparar e COMO misturar.

## CAMPO SPIRITUALITY — 3 PARÁGRAFOS OBRIGATÓRIOS
§1: Identidade do Orixá (nome + títulos Oriki + domínios + símbolos sagrados)
§2: Conexão específica deste Orixá com este Odu (por que ele rege este caminho)
§3: Instruções práticas para o consulente se conectar com este Orixá agora

## REGRAS INVIOLÁVEIS
1. Zero sincretismo. 2. Anti-clone: Ebós de Amor/Dinheiro/Saúde = ingredientes DIFERENTES.
3. Mín. 60 palavras por campo marcado (conte internamente, expanda se necessário).
4. Retorne APENAS JSON válido.
5. ⭐ REGRA DE OURO — OFÓ/OKIRI/SOPRO DIVINO: SEMPRE que houver uma reza (Ofó), um cântico (Okiri) ou um Sopro Divino (Passo 7) em QUALQUER campo do JSON, o texto em Iorubá DEVE vir primeiro, imediatamente seguido da tradução completa em português. SEM EXCEÇÃO. Formato exigido:
   Em Iorubá: "[texto]"
   Tradução: "[tradução verso a verso]"
   Nunca apresente apenas o Iorubá sem tradução. Nunca apresente apenas a tradução sem o Iorubá.

## EXEMPLO COMPLETO (11 ingredientes, 8 passos):
"complete": {
  "description": "Ebó de União com Oferenda de Eje para Oshun",
  "ingredients": ["Adiye Funfun (Galinha Branca)","Epo Pupa (Azeite de Dendê)","Oti (Cachaça de Cana)","Iyerosun (Pó Sagrado de Ifá)","Omi Tutu (Água Fresca)","Obi Abata (Noz de Cola Amarga)","Orogbo (Noz Orogbo Seca)","Atare (Pimenta da Costa)","Obi Omi Tuto (Cola Branca Hidratada)","Iyo (Sal Marinho Puro)","Ewe Efinrin (Alfavaca Sagrada)"],
  "instructions": "1. Lave a Adiye Funfun (Galinha Branca) com Omi Tutu (Água Fresca) rezando a saudação de Oshun.\\n2. Derrame Oti (Cachaça) no chão abrindo o caminho e saudando Esu Elegbara: 'Esu ode orun, ki o si fun mi ni ona'.\\n3. Gige (Corte Ritual): Corte a jugular da Adiye Funfun (Galinha Branca) com a Obe (Faca Ritual) de leste para oeste.\\n4. Eje (Sangue): Verta o Eje sobre o Iyerosun (Pó Sagrado de Ifá) traçando o Odu com o dedo indicador.\\n5. Uso das Partes: Retire as Iye (Penas) e cole-as sobre o Odu traçado no Iyerosun. Reserve o Ori Adiye (Cabeça da Galinha) para oferenda completa.\\n6. Mistura Sagrada: Num Oru (Pote de Barro), combine Epo Pupa + Obi Abata + Atare + Orogbo + Obi Omi Tuto + Ewe Efinrin + Iyo com intenção de união amorosa, girando 16 vezes no sentido horário.\\n7. Sopro Divino: Sopre três vezes sobre a mistura e profira o Ofó: 'Oshun iya mi o, mo pe o. Omi na pa ina, ife na pa ogun. Ki o so ife wa di otito, bi omi ti n san lailai.' Tradução: 'Oshun minha mãe, eu te chamo. Água apaga fogo, amor afasta guerra. Que faça nosso amor ser verdadeiro, como água que flui eternamente.'\\n8. Despacho: Às margens de um rio (morada de Oshun), na sexta-feira entre 12h e 14h, ofereça tudo com louvor.",
  "ofo": "Oshun iya mi o, mo pe o. Omi na pa ina, ife na pa ogun. Ki o so ife wa di otito, bi omi ti n san lailai.",
  "translation": "Oshun minha mãe, eu te chamo. Água apaga fogo, amor afasta guerra. Que faça nosso amor ser verdadeiro, como água que flui eternamente."
}`;

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
export const fetchInterpretation = async (odu: OduInfo, lang: string, iboResult?: { type: string; subType: string; description: string }): Promise<AIInterpretation> => {
  const fallback = makeFallback(odu.name);
  if (!getKey()) {
    console.warn("fetchInterpretation: sem chave Groq.");
    return fallback;
  }

  const iboContext = iboResult
    ? `\n🎯 IBÓ REVELADO (use este resultado para orientar TODO o conteúdo): ${iboResult.type} — ${iboResult.subType}: "${iboResult.description}"\n→ O campo "ireOrOsogbo" do JSON DEVE ser "${iboResult.type === 'IRE' ? 'Irê' : 'Osogbo'}". Toda a leitura deve refletir este caminho.\n`
    : '';

  const libraryContext = searchLibrary(odu.name);

  const userPrompt = `Odu consultado: "${odu.name}". IDIOMA: Português do Brasil (PT-BR).${iboContext}
${libraryContext}

⚠️ AVISO ANTI-CLONE — LEIA ANTES DE GERAR:
Se os Ebós de Amor, Dinheiro e Saúde contiverem os MESMOS ingredientes ou passos = RESPOSTA INVÁLIDA.
Cada área tem ingredientes semanticamente distintos:
- AMOR → elementos de rio, mel, pétalas, Ewe Efinrin, Omiero de Oshun
- DINHEIRO → Owo (dinheiro), Eko (cuscuz ritual), Akara (bolinho), Ewe Osun, pó dourado
- SAÚDE → ervas medicinais (Ewe Tete, Ewe Igi), Omi Tutu, Efun (casca branca), Aadun

REGRA FORMATO ABSOLUTA: Todo ingrediente = "Iorubá (Português)" SEM EXCEÇÃO.

COMPLETO (Matança): OBRIGATÓRIO 10+ ingredientes E exatamente 8 passos detalhados.

Retorne APENAS este JSON:

{
  "oduName": "${odu.name}",
  "summary": "[MÍN. 60 PALAVRAS: Resumo técnico da energia deste Odu, mencionando Orixá, Ibi e Ire]",
  "itan": "[MÍN. 60 PALAVRAS: Narrativa do Itan REAL deste Odu extraído da literatura de Ifá com personagens, Ewo e ensinamentos]",
  "itanSummary": "[1-2 frases resumindo o Itan]",
  "itanAnalysis": "[MÍN. 60 PALAVRAS: Como este Itan se aplica ao consulente hoje]",
  "chant": {
    "yoruba": "[Ofó/Verso autêntico em Iorubá deste Odu]",
    "translation": "[MÍN. 60 PALAVRAS: Tradução verso a verso com explicação do poder místico de cada linha]"
  },
  "oduOriki": {
    "yoruba": "[Oriki deste Odu em Iorubá]",
    "translation": "[Tradução do Oriki]",
    "instructions": "[Como e quando entoar]"
  },
  "herbalBaths": {
    "name": "[Nome em Iorubá (Português)]",
    "ingredients": ["Ewe X (Erva X)", "Ewe Y (Erva Y)", "Omi Tutu (Água Fresca)", "Ewe Z (Erva Z)"],
    "preparation": "[MÍN. 60 PALAVRAS: Temperatura, horário, dias consecutivos, modo de aplicar]",
    "purpose": "[Finalidade espiritual do banho]"
  },
  "generalAdvice": "[MÍN. 60 PALAVRAS: Orientações gerais e conselhos de Ifá para o consulente neste Odu]",
  "love": {
    "analysis": "[MÍN. 60 PALAVRAS: O que este Odu revela sobre vida amorosa e uniões]",
    "ebos": {
      "basic": {
        "description": "[Nome do Ebó Simples de Amor — sem animal]",
        "ingredients": ["Obi Omi Tuto (Noz de Cola Branca Hidratada)", "Obi Abata (Noz de Cola Amarga)", "Omi Oshun (Água de Rio)", "Oyin (Mel Natural)", "Ewe Efinrin (Alfavaca Sagrada)", "Omi Riro (Água de Chuva)"],
        "instructions": "1. [Purificação do espaço com Omi Tutu]\n2. [Preparo das ervas em tigela de barro]\n3. [Reza de abertura para Oshun ou Orixá de Amor deste Odu]\n4. Mistura Sagrada: [combinação dos elementos com intenção de união]\n5. Sopro Divino: Profira o Ofó sobre a mistura.\n6. [Modo de usar: banhar, portar ou depositar]",
        "ofo": "[Ofó em Iorubá para Amor — mín. 3 linhas]",
        "translation": "[Tradução completa do Ofó]"
      },
      "medium": {
        "description": "[Nome do Ebó Médio de Amor — com ave]",
        "ingredients": ["Eyelé Funfun (Pomba Branca)", "Oyin (Mel Natural)", "Omi Oshun (Água de Rio)", "Epo Pupa (Azeite de Dendê)", "Ewe Efinrin (Alfavaca Sagrada)", "Atare (Pimenta da Costa)", "Iyo (Sal Marinho)", "Oti (Cachaça de Cana)"],
        "instructions": "1. [Preparo e limpeza da Eyelé Funfun]\n2. [Reza de abertura invocando o Orixá de Amor]\n3. Eje (Sangue): [derramar sobre elemento de união — descreva com precisão]\n4. [Uso das penas — Iye — sobre o elemento sagrado]\n5. [Mistura dos elementos restantes com intenção]\n6. Sopro Divino + Ofó em Iorubá.\n7. Despacho: [como e onde oferecer]",
        "ofo": "[Ofó em Iorubá para Amor Médio]",
        "translation": "[Tradução]"
      },
      "complete": {
        "description": "[Nome Sacerdotal Completo de Amor — Matança prescrita]",
        "ingredients": ["[Animal prescrito pelo Odu para Amor]", "Oyin (Mel Natural)", "Omi Oshun (Água de Rio)", "Epo Pupa (Azeite de Dendê)", "Ewe Efinrin (Alfavaca Sagrada)", "Obi Omi Tuto (Noz de Cola Branca)", "Obi Abata (Noz de Cola Amarga)", "Atare (Pimenta da Costa)", "Iyerosun (Pó Sagrado de Ifá)", "Oti (Cachaça de Cana)", "[Ingrediente específico do Odu para Amor]"],
        "instructions": "1. [Preparo e limpeza ritual do animal com Omi Tutu e reza]\n2. [Reza de abertura: invocação solene do Orixá e de Esu Elegbara para abrir o caminho]\n3. Gige (Corte Ritual): [descreva o corte exato — jugular, pescoço — sentido e posição]\n4. Eje (Derrame de Sangue): [sobre qual elemento sagrado — Iyerosun, Odu traçado — com o dedo indicador]\n5. [Uso das partes do animal: Iye=penas coladas no Odu, Ori=cabeça reservada para o local de despacho]\n6. Mistura Sagrada: [em Oru (pote de barro), combine todos os demais ingredientes com intenção de Amor, girando 16x no horário]\n7. Sopro Divino: Sopre 3x e profira o Ofó completo em Iorubá — mín. 4 linhas — com tradução.\n8. Despacho: [local específico, dia da semana, hora — ex: margem de rio na sexta às 13h]",
        "ofo": "[Ofó completo em Iorubá para Amor — mín. 4 linhas]",
        "translation": "[Tradução verso a verso]"
      }
    }
  },
  "finance": {
    "analysis": "[MÍN. 60 PALAVRAS: O que este Odu revela sobre finanças, trabalho e prosperidade — TEMÁTICA COMPLETAMENTE DIFERENTE de Amor]",
    "ebos": {
      "basic": {
        "description": "[Nome do Ebó Simples de Dinheiro — sem animal]",
        "ingredients": ["Eko (Cuscuz Ritual de Milho Branco)", "Akara (Bolinho de Feijão Fradinho)", "Obi Abata (Noz de Cola Amarga)", "Orogbo (Noz Orogbo Seca)", "Ewe Osun (Folha de Cambará)", "Iyo (Sal Marinho Puro)", "Oti (Cachaça de Cana)"],
        "instructions": "1. [Preparo do Eko e Akara como oferenda de atração de Aje]\n2. [Disposição dos elementos sobre Aso Funfun (pano branco)]\n3. [Reza invocando Aje — Orixá da Riqueza — ou Orixá financeiro deste Odu]\n4. Mistura Sagrada: [combinação com intenção de prosperidade e abertura de caminho]\n5. Sopro + Ofó de prosperidade em Iorubá\n6. [Despacho: encruzilhada ou mercado — local de circulação do dinheiro]",
        "ofo": "[Ofó em Iorubá para prosperidade — diferente do de Amor]",
        "translation": "[Tradução]"
      },
      "medium": {
        "description": "[Nome do Ebó Médio de Dinheiro — com ave ou animal menor]",
        "ingredients": ["Akuko Pupa (Galo Vermelho)", "Eko (Cuscuz Ritual)", "Orogbo (Noz Orogbo)", "Ewe Osun (Folha de Cambará)", "Epo Pupa (Azeite de Dendê)", "Iyo (Sal Marinho)", "Atare (Pimenta da Costa)", "Oti (Cachaça de Cana)"],
        "instructions": "1. [Preparo e limpeza do Akuko Pupa (Galo)]\n2. [Reza invocando Ogun, Sango ou Orixá financeiro deste Odu]\n3. Eje: [derramar sobre Eko (cuscuz) — base do trabalho financeiro]\n4. [Uso das Iye (penas) do Akuko sobre a oferenda]\n5. [Distribuição dos demais ingredientes com intenção de atração de Aje]\n6. Sopro + Ofó.\n7. Despacho: [local de comércio ou encruzilhada]",
        "ofo": "[Ofó em Iorubá para prosperidade]",
        "translation": "[Tradução]"
      },
      "complete": {
        "description": "[Nome Sacerdotal Completo de Dinheiro]",
        "ingredients": ["[Animal prescrito pelo Odu para Dinheiro — DIFERENTE do de Amor]", "Eko (Cuscuz Ritual de Milho)", "Akara (Bolinho de Feijão Fradinho)", "Orogbo (Noz Orogbo Seca)", "Obi Abata (Noz de Cola Amarga)", "Ewe Osun (Folha de Cambará)", "Iyo (Sal Marinho Puro)", "Epo Pupa (Azeite de Dendê)", "Oti (Cachaça de Cana)", "Iyerosun (Pó Sagrado de Ifá)", "[Ingrediente específico do Odu para prosperidade]"],
        "instructions": "1. [Preparo e limpeza ritual do animal com reza de abertura para Aje e Esu]\n2. [Reza solene invocando o Orixá da prosperidade deste Odu]\n3. Gige (Corte Ritual): [descreva o corte exato sobre o animal]\n4. Eje: [derramar sobre Eko (cuscuz) — base da prosperidade — traçando símbolo do Odu]\n5. [Uso das partes: Iye (penas) coladas no símbolo, Ori (cabeça) reservada]\n6. Mistura Sagrada: [em Oru de barro, combine todos os ingredientes com intenção de Aje (riqueza), 16x no horário]\n7. Sopro Divino + Ofó completo em Iorubá (mín. 4 linhas) + tradução\n8. Despacho: [local de mercado ou encruzilhada de 4 vias, dia e hora específicos]",
        "ofo": "[Ofó em Iorubá para prosperidade — mín. 4 linhas]",
        "translation": "[Tradução verso a verso]"
      }
    }
  },
  "health": {
    "analysis": "[MÍN. 60 PALAVRAS: O que este Odu prescreve para saúde e vitalidade — TEMÁTICA COMPLETAMENTE DIFERENTE dos anteriores]",
    "risks": ["[Risco de saúde 1 específico do Odu]", "[Risco 2]", "[Risco 3]"],
    "ebos": {
      "basic": {
        "description": "[Nome Ebó Simples de Saúde — sem animal]",
        "ingredients": ["Efun (Casca de Caracol em Pó Branco)", "Ewe Tete (Amaranto Sagrado)", "Ewe Odundun (Folha da Vida)", "Omi Tutu (Água Fresca de Nascente)", "Obi Funfun (Noz de Cola Branca)", "Ori (Manteiga de Karité)"],
        "instructions": "1. [Preparo do banho de ervas medicinais em água fria]\n2. [Fricção suave do Efun (pó) sobre o corpo banhado]\n3. [Reza de cura invocando Obaluwaiê, Osun ou Orixá de saúde deste Odu]\n4. Mistura Sagrada: [combinar Ori + Efun + Ewe com intenção de cura]\n5. Sopro + Ofó de cura em Iorubá\n6. [Aplicação ou ingestão conforme o Odu — descreva]",
        "ofo": "[Ofó em Iorubá para saúde e cura — diferente dos anteriores]",
        "translation": "[Tradução]"
      },
      "medium": {
        "description": "[Nome Ebó Médio de Saúde — com ave]",
        "ingredients": ["Eyelé Pupa (Pomba Vermelha/Acobaça)", "Efun (Pó Branco Sagrado)", "Ewe Tete (Amaranto)", "Ewe Igi Ogbo (Erva do Ancião)", "Omi Tutu (Água Fresca)", "Ori (Manteiga de Karité)", "Ero (Terra de Formigueiro)", "Obi Funfun (Noz de Cola Branca)"],
        "instructions": "1. [Preparo e limpeza da ave com ervas medicinais]\n2. [Reza de cura invocando o Orixá de saúde]\n3. Eje: [derramar sobre Efun (pó branco) — símbolo de pureza e cura]\n4. [Uso das Iye (penas) sobre o conjunto de ervas]\n5. [Preparo da mistura curativa com Ori + Ewe]\n6. Sopro + Ofó de cura.\n7. Despacho: [hospital, mata ou cemitério — conforme o Odu]",
        "ofo": "[Ofó em Iorubá para cura]",
        "translation": "[Tradução]"
      },
      "complete": {
        "description": "[Nome Sacerdotal Completo de Saúde]",
        "ingredients": ["[Animal prescrito pelo Odu para Saúde — DIFERENTE dos anteriores]", "Efun (Pó Branco Sagrado de Osala)", "Ewe Tete (Amaranto Sagrado)", "Ewe Odundun (Folha da Vida)", "Ewe Igi Ogbo (Erva do Ancião)", "Omi Tutu (Água Fresca de Nascente)", "Ori (Manteiga de Karité)", "Obi Funfun (Noz de Cola Branca)", "Ero (Terra de Formigueiro)", "Iyerosun (Pó Sagrado de Ifá)", "[Ingrediente curativo específico do Odu]"],
        "instructions": "1. [Preparo e limpeza ritual do animal com banho de Ewe medicinais e reza de purificação]\n2. [Reza solene de abertura invocando Obaluwaiê, Orixalá ou Orixá de saúde deste Odu]\n3. Gige (Corte Ritual): [descreva o corte exato — onde, como, sentido do corte]\n4. Eje: [derramar sobre Efun (pó branco) — símbolo de cura — traçando o Odu com dedo indicador]\n5. [Uso das partes: Iye (penas) coladas no símbolo de cura, Ori (cabeça) reservada para o Orixá]\n6. Mistura Sagrada: [em Oru de barro, combine TODOS os ingredientes medicinais com intenção de cura, 16x no horário]\n7. Sopro Divino + Ofó completo de cura em Iorubá (mín. 4 linhas) + tradução\n8. Despacho: [mata sagrada, hospital ou encruzilhada conforme o Odu, dia e hora específicos]",
        "ofo": "[Ofó em Iorubá para cura e saúde — mín. 4 linhas]",
        "translation": "[Tradução verso a verso]"
      }
    }
  },
  "osogbo": {
    "analysis": "[MÍN. 60 PALAVRAS: Quais forças negativas operam neste Odu e como afastá-las]",
    "ebo": { "description": "[Ebó para afastar Osogbo]", "instructions": "[6+ passos detalhados]", "ingredients": ["[4+ ingredientes em Iorubá (PT)]"], "ofo": "[Ofó de proteção]", "translation": "[Tradução]" }
  },
  "spirituality": "[MÍN. 60 PALAVRAS — 3 PARÁGRAFOS: §1 Identidade do Orixá (nome+títulos Oriki+domínios) §2 Por que este Orixá rege este Odu §3 Como o consulente pode se conectar com este Orixá agora]",
  "diet": {
    "positive": "[MÍN. 60 PALAVRAS: Alimentos favoráveis com razão espiritual para cada um]",
    "negative": "[MÍN. 60 PALAVRAS: Ewo — cada proibição com razão ancestral obrigatória]"
  },
  "clothing": {
    "positive": "[Cores favoráveis e motivo espiritual]",
    "negative": "[Cores proibidas e motivo ancestral]"
  },
  "dangers": "[MÍN. 60 PALAVRAS: Bloqueios espirituais detectados e perigos iminentes deste Odu]",
  "rulingOrishas": "[Orixá(s) regente(s) deste Odu]",
  "destinyAndOri": "[MÍN. 60 PALAVRAS: Conexão entre Ayanmo (destino), Ori (cabeça espiritual) e este Odu — como cuidar do Ori agora]",
  "obstaclesAndEnemies": "[MÍN. 60 PALAVRAS: Forças e entidades que operam contra o consulente neste Odu]",
  "solutionsAndEbos": {
    "basic": { "description": "[Ebó Principal Simples]", "instructions": "[5+ passos]", "ingredients": ["[4+ ingredientes em Iorubá (PT)]"], "ofo": "[Ofó]", "translation": "[Tradução]" },
    "medium": { "description": "[Ebó Principal Médio]", "instructions": "[6+ passos]", "ingredients": ["[5+ ingredientes]"], "ofo": "[Ofó]", "translation": "[Tradução]" },
    "complete": {
      "description": "[EBÓ PRINCIPAL COMPLETO — Sacerdotal/Matança]",
      "instructions": "1. [Preparo e limpeza do animal]\n2. [Reza de abertura]\n3. Gige (Corte Ritual): [detalhado]\n4. Eje: [sobre qual elemento]\n5. [Uso das partes]\n6. Mistura Sagrada: [combinação]\n7. Sopro Divino + Ofó completo em Iorubá\n8. Despacho: [local, dia, hora]",
      "ingredients": ["[Animal prescrito]", "[Ingr 2]", "[Ingr 3]", "[Ingr 4]", "[Ingr 5]", "[Ingr 6]", "[Ingr 7]", "[Ingr 8]", "[Ingr 9]", "[Ingr 10 — mín. 10 total]"],
      "ofo": "[Ofó em Iorubá]",
      "translation": "[Tradução]"
    }
  },
  "ancestry": "[MÍN. 60 PALAVRAS: Conexão com os ancestrais (Egungun) e como honrá-los neste Odu]",
  "personality": "[MÍN. 60 PALAVRAS: Traços de personalidade revelados por este Odu]",
  "decisionMaking": "[MÍN. 60 PALAVRAS: Conselho de Ifá para tomada de decisões]",
  "warning": "[MÍN. 60 PALAVRAS: O aviso mais urgente que este Odu traz]",
  "luckyItems": ["[Item sagrado 1 em Iorubá (PT)]", "[Item sagrado 2]", "[Item sagrado 3]"],
  "ireOrOsogbo": "Irê",
  "ireOsogboDescription": "[Descrição do caminho revelado pelo Ibó]",
  "ireOsogboAction": "[Ação imediata prescrita por Ifá]"
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
  if (!getKey()) return "O sistema não está ativo. Configure sua chave Groq nas configurações.";
  try { return await callGroq(THUNDER_SYSTEM, query, false); }
  catch (e) { return handleError(e, "VoiceOfThunder"); }
};

// ─── AKOSE ─────────────────────────────────────────────────────────────────────
export const fetchAkose = async (oduName: string, category: string, problem: string, lang: string): Promise<AkoseV4> => {
  const fallback: AkoseV4 = {
    tipo: "akose", titulo_yoruba: "Consulta Offline", finalidade: "Sem conexão",
    materiais: [], modo_preparo_sacerdotal: "Não foi possível acessar a base online.",
    ofo_ativacao: { yoruba: "", portugues: "", fonetica: "" },
    visualizacao_consulente: { orcamento: true, finalidade: true, preparo: false },
  };
  if (!getKey()) return fallback;
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
  if (!getKey()) return { fullAnswer: "Configure sua chave Groq.", shortSummary: "Erro", ritualType: "ebo", ritualTitle: "", basic: null, medium: null, complete: null };
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
  if (!getKey()) return { meaning: "Erro", relatedOdu: "N/A", advice: "Tente novamente.", isPositive: true };
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

  if (!getKey()) return fallback;

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
export const analyzeOpeleImage = async () => ({ rightLeg: ["open", "open", "open", "open"], leftLeg: ["open", "open", "open", "open"] });
export const analyzeFace = async (imageBase64: string, lang: string = 'pt-BR') => ({ emotionalState: "...", oriDiagnosis: "...", recommendation: "..." });
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
  if (!getKey()) return defaultResult;
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

  if (!getKey()) return fallback;
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

  if (!getKey()) return fallback;
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
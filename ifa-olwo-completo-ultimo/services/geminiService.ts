import Groq from "groq-sdk";
import { AIInterpretation, OduInfo, AkoseV4, SangoJusticeResult, EboDetail, IreOsogboType } from "../types";
import { searchLibrary } from "../src/utils/librarySearch";

let ai: Groq | null = null;

export const initializeAI = (): boolean => {
    let key = "";
    try { if ((import.meta as any).env?.VITE_GROQ_API_KEY) key = (import.meta as any).env.VITE_GROQ_API_KEY; } catch(e) {}
    if (!key) { try { key = localStorage.getItem('ifa_manual_key') || ""; } catch(e) {} }
    if (key && key.length > 5) {
        try { ai = new Groq({ apiKey: key, dangerouslyAllowBrowser: true }); return true; } catch(e) { return false; }
    }
    return false;
};

initializeAI();

const cleanJson = (s: string): string => {
    if (!s) return "{}";
    let c = s.trim().replace(/^```json/,"").replace(/^```/,"").replace(/```$/,"");
    const st = c.indexOf("{"), en = c.lastIndexOf("}");
    return (st !== -1 && en > st) ? c.substring(st, en + 1) : c;
};

const BLANK_EBO: EboDetail = { description: "Sem registro litúrgico.", instructions: "Consulte a literatura de Ifá.", ingredients: [] };

const getRobustFallback = (oduName: string): AIInterpretation => ({
    oduName, summary: "Aguardando conexão com o Oráculo...", itan: "...", itanSummary: "...", itanAnalysis: "...",
    chant: { yoruba: "...", translation: "..." }, oduOriki: { yoruba: "...", translation: "...", instructions: "..." },
    herbalBaths: { name: "...", ingredients: [], preparation: "...", purpose: "..." }, generalAdvice: "...",
    love: { analysis: "...", ebos: { basic: BLANK_EBO, medium: BLANK_EBO, complete: BLANK_EBO } },
    finance: { analysis: "...", ebos: { basic: BLANK_EBO, medium: BLANK_EBO, complete: BLANK_EBO } },
    health: { analysis: "...", risks: [], ebos: { basic: BLANK_EBO, medium: BLANK_EBO, complete: BLANK_EBO } },
    osogbo: { analysis: "...", ebo: BLANK_EBO }, spirituality: "...",
    diet: { positive: "...", negative: "..." }, clothing: { positive: "...", negative: "..." },
    dangers: "...", rulingOrishas: "...", destinyAndOri: "...", obstaclesAndEnemies: "...",
    solutionsAndEbos: { basic: BLANK_EBO, medium: BLANK_EBO, complete: BLANK_EBO },
    ancestry: "...", personality: "...", decisionMaking: "...", warning: "...", luckyItems: [],
    ireOrOsogbo: "Irê", ireOsogboDescription: "...", ireOsogboAction: "..."
});

// ============================================================
// REGRAS DE OURO — NUNCA ALTERAR SEM APROVAÇÃO DO BABALAWO
// ============================================================
const SYSTEM_PROMPT = `
Você é um Babalawo Digital. Sua função é REPRODUZIR a literatura sagrada de Ifá (Wande Abimbola, Solagbade Popoola, William Bascom, Pierre Verger, Afolabi Epega). Você NÃO cria conteúdo novo — você reproduz o que está documentado nos livros sagrados.

REGRA SUPREMA — ITAN (NARRATIVA SAGRADA):
O Ifá possui mais de 10.000 Itans documentados. O campo "itan" deve reproduzir o Itan mais conhecido deste Odu em sua base de treinamento, de forma fiel à tradição oral e literária de Ifá. Se você tiver dúvida sobre detalhes específicos, indique a fonte de referência (ex: "Baseado em Wande Abimbola - Ifa Literary Corpus"). JAMAIS invente personagens, desfechos ou ensinamentos que não existam na tradição. O Itan deve ter no mínimo 100 palavras com narrativa completa.

REGRAS DOS EBÓS E DEMAIS CAMPOS:
1. NUNCA INVENTE Ebós ou Akose. Se não há registro literário, informe a ausência.
2. ANTI-GENÉRICO: Proibido "Animal de sacrifício", "Ingredientes sagrados", "Pano verde". Use nomes reais com quantidade e cor (ex: "1 Akuko Funfun vivo", "2 Eyele Meji", "16 Obi Abata de 4 gomos").
3. ANTI-CLONE: Amor, Dinheiro e Saúde devem ter Ebós com materiais e passos DIFERENTES entre si.
4. ANTI-SINCRETISMO: Proibido "vela" (use Itana), "santo", "anjo", "amém". Só terminologia Yoruba litúrgica.
5. NÍVEIS DE EBÓ:
   - BASIC: Sem sangue (Obi, Omi Tutu, Epo Pupa, frutas). Cliente pode realizar.
   - MEDIUM: Adimu cozido, Padê, Oti, Iyerosun. Supervisão sacerdotal.
   - COMPLETE (MATANÇA): OBRIGATÓRIO animal com Eje + fundamento de Igbodu. Descreva liturgicamente.
6. FORMATO DOS INGREDIENTES — REGRA ABSOLUTA: TODOS os ingredientes devem estar NO FORMATO: "Nome Yoruba (Tradução Portuguesa)". EXEMPLOS CORRETOS: "Ewure Dudu (Cabrito Preto)", "Akuko Funfun (Galo Branco)", "Epo Pupa (Azeite de Dendê)", "Oti (Cachaça/Gim)", "Iyerosun (Pó Sagrado de Ifá)", "Omi Tutu (Água Fresca)", "16 Obi Abata (16 Nozes de Obi de 4 Gomos)". PROIBIDO escrever apenas o nome em Português sem o nome Yoruba.
7. QUANTIDADE MÍNIMA DE INGREDIENTES: BASIC e MEDIUM: mínimo 4 ingredientes. COMPLETE (MATANÇA): mínimo 8 ingredientes (animal + sangue + fundamentos + elementos de limpeza).
8. INSTRUÇÕES EM PASSOS NUMERADOS: Mínimo 6 passos para COMPLETE. Ex: "1. Lave o Akuko Funfun com Omi Tutu. 2. Reze o Ofo do Odu. 3. Derrame Oti no chão..."
9. MÍNIMO 60 PALAVRAS: summary, itanAnalysis, generalAdvice, spirituality, dangers, e cada analysis de Amor/Dinheiro/Saúde.
10. Retorne APENAS JSON válido. Sem texto fora do JSON.
`;

export const fetchInterpretation = async (odu: OduInfo, lang: string, iboResult?: IreOsogboType): Promise<AIInterpretation> => {
    if (!ai) initializeAI();
    const fallback = getRobustFallback(odu.name);
    if (!ai) return fallback;

    const ibo = iboResult ? `Caminho detectado: ${iboResult.type} — ${iboResult.subType}.` : "Caminho não informado.";

    // Busca trechos reais da biblioteca local de PDFs
    const libraryContext = await searchLibrary(odu.name, 4);
    const hasLibrary = libraryContext.length > 0;

    try {
        const res = await ai.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            temperature: 0.4,
            max_tokens: 6000,
            response_format: { type: "json_object" },
            messages: [
                { role: "system", content: SYSTEM_PROMPT + (hasLibrary ? "\n\nIMPORTANTE: O usuário forneceu trechos da sua BIBLIOTECA PESSOAL DE IFÁ abaixo. USE-OS COMO FONTE PRIMÁRIA. Priorize as informações desses trechos sobre o seu treinamento geral." : "") },
                { role: "user", content: `${libraryContext}Odu: ${odu.name}. ${ibo}. Língua: Português do Brasil.`, },
                { role: "user", content: `EXIGÊNCIAS OBRIGATÓRIAS:
- "itan": NUNCA RESUMA. Escreva o Itan completo com início, meio e fim (mínimo 150 palavras, narrativa integral e rica). Indique a fonte se souber.
- "ireOsogboDescription": OBRIGATÓRIO. Descreva em detail (mín 60 palavras) o que significa o caminho ${iboResult?.type || 'Irê'} para este Odu específico — o que está aberto, o que está protegido, qual é a mensagem do Obátalá ou Orunúmilà para este momento.
- "ireOsogboAction": OBRIGATÓRIO. Descreva em detalhe (mín 60 palavras) a ação concreta que o consulente deve tomar baseado no caminho — o que fazer, o que evitar, qual a prioridade imediata.
- "summary", "itanAnalysis", "generalAdvice", "spirituality", "dangers", "destinyAndOri", "obstaclesAndEnemies", "ancestry", "personality", "decisionMaking", "warning": mínimo 60 palavras cada.
- "analysis" de Amor, Dinheiro e Saúde: mínimo 60 palavras cada.
- "instructions" de Ebó: APENAS NO EBÓ COMPLETO deve ser extremamente extenso e detalhado (mínimo 10 passos). Nos Ebós Básicos e Médios, seja direto (mínimo 5 passos). Explique o destino final litúrgico. ATENÇÃO À LÓGICA: Nunca mande "libertar" um animal sacrificado! Se houve sacrifício, explique o destino do ejé e da carne. 
A REZA DO OFO DEVE ESTAR DENTRO DO MODO DE PREPARO NESTE FORMATO EXATO:
"Reze o Ofo em Yoruba: [Texto Yoruba]"
"Tradução: [Texto Português]"
MUITO IMPORTANTE: Use quebras de linha literais (\\n) entre cada passo numerado para que o texto fique formatado como uma lista vertical.
- REGRAS DOS NÍVEIS DE EBÓ (ESTRITAMENTE OBRIGATÓRIO):
  * BASIC (Acessível): ZERO MATANÇA (proibido animais/sangue). Apenas água, gin, obi, orogbo, epo, mel, folhas, moedas. (Mínimo 5 elementos).
  * MEDIUM (Tradição): Pode usar aves (Akuko, Adie, Eyele, Etu). (Mínimo 8 elementos).
  * COMPLETE (Matança pesada): OBRIGATÓRIO ter bicho de 4 patas (Ewure, Agbo, Orukọ, Elede) OU múltiplos animais. OBRIGATÓRIO TER NO MÍNIMO 16 ELEMENTOS na lista (incluindo ewé, favas, iyerosun, búzios, bebidas, obi, orogbo, epo, oti). NUNCA DEIXE O COMPLETE COM MENOS DE 16 ITENS.
- INGREDIENTES — FORMATO OBRIGATÓRIO: "Nome Yoruba (Tradução)".
- REGRA ANTI-CLONE ESTRITA: Amor, Dinheiro e Saúde DEVEM ter animais E ingredientes secundários COMPLETAMENTE DIFERENTES.

JSON a preencher (CUIDADO COM A SINTAXE):
{"oduName":"","ireOrOsogbo":"Irê","ireOsogboDescription":"","ireOsogboAction":"","summary":"","itan":"","itanSummary":"","itanAnalysis":"","chant":{"yoruba":"","translation":""},"oduOriki":{"yoruba":"","translation":"","instructions":""},"herbalBaths":{"name":"","ingredients":["Item 1","Item 2","Item 3"],"preparation":"","purpose":""},"solutionsAndEbos":{"basic":{"description":"","instructions":"...","ingredients":["Item 1","Item 2","Item 3","Item 4","Item 5"],"ofo":"","translation":""},"medium":{"description":"","instructions":"...","ingredients":["Item 1","Item 2","Item 3","Item 4","Item 5","Item 6","Item 7","Item 8"],"ofo":"","translation":""},"complete":{"description":"","instructions":"...","ingredients":["Animal de 4 patas","Item 2","Item 3","Item 4","Item 5","Item 6","Item 7","Item 8","Item 9","Item 10","Item 11","Item 12","Item 13","Item 14","Item 15","Item 16"],"ofo":"","translation":""}},"generalAdvice":"","love":{"analysis":"","ebos":{"basic":{"description":"","instructions":"...","ingredients":["Item 1","Item 2"],"ofo":"","translation":""},"medium":{"description":"","instructions":"...","ingredients":["Item 1","Item 2"],"ofo":"","translation":""},"complete":{"description":"","instructions":"...","ingredients":["Animal","Item 2","Item 3","Item 4","Item 5","Item 6","Item 7","Item 8","Item 9","Item 10","Item 11","Item 12","Item 13","Item 14","Item 15","Item 16"],"ofo":"","translation":""}}},"finance":{"analysis":"","ebos":{"basic":{"description":"","instructions":"...","ingredients":["Item 1","Item 2"],"ofo":"","translation":""},"medium":{"description":"","instructions":"...","ingredients":["Item 1","Item 2"],"ofo":"","translation":""},"complete":{"description":"","instructions":"...","ingredients":["Animal","Item 2","Item 3","Item 4","Item 5","Item 6","Item 7","Item 8","Item 9","Item 10","Item 11","Item 12","Item 13","Item 14","Item 15","Item 16"],"ofo":"","translation":""}}},"health":{"analysis":"","risks":[],"ebos":{"basic":{"description":"","instructions":"...","ingredients":["Item 1","Item 2"],"ofo":"","translation":""},"medium":{"description":"","instructions":"...","ingredients":["Item 1","Item 2"],"ofo":"","translation":""},"complete":{"description":"","instructions":"...","ingredients":["Animal","Item 2","Item 3","Item 4","Item 5","Item 6","Item 7","Item 8","Item 9","Item 10","Item 11","Item 12","Item 13","Item 14","Item 15","Item 16"],"ofo":"","translation":""}}},"osogbo":{"analysis":"","ebo":{"description":"","instructions":"...","ingredients":["Item 1","Item 2"],"ofo":"","translation":""}},"spirituality":"","diet":{"positive":"","negative":""},"clothing":{"positive":"","negative":""},"dangers":"","rulingOrishas":"","destinyAndOri":"","obstaclesAndEnemies":"","ancestry":"","personality":"","decisionMaking":"","warning":"","luckyItems":[]}` }
            ]
        });
        const parsed = JSON.parse(cleanJson(res.choices[0]?.message?.content || "{}"));
        return { ...fallback, ...parsed };
    } catch(e) {
        console.error("fetchInterpretation error:", e);
        return fallback;
    }
};

export const askVoiceOfThunder = async (query: string): Promise<string> => {
    if (!ai) initializeAI();
    if (!ai) return "Oráculo offline. Verifique a chave Groq.";
    try {
        const res = await ai.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                { role: "system", content: SYSTEM_PROMPT + "\nSe o usuário pedir ritual ou magia, responda com JSON dentro de <RITUAL_CARD>...</RITUAL_CARD>." },
                { role: "user", content: query }
            ]
        });
        return res.choices[0]?.message?.content || "Silêncio no Oráculo.";
    } catch(e: any) { return `Erro: ${e.message}`; }
};

export const askSpecificQuestion = async (oduName: string, context: any, question: string, lang: string): Promise<{ fullAnswer: string; shortSummary: string }> => {
    if (!ai) initializeAI();
    if (!ai) return { fullAnswer: "Oráculo offline.", shortSummary: "Erro." };
    try {
        const res = await ai.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            response_format: { type: "json_object" },
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `Odu: ${oduName}. Pergunta do consulente: "${question}". Responda com sabedoria de Ifá. JSON: { "fullAnswer": "...", "shortSummary": "..." }` }
            ]
        });
        return JSON.parse(cleanJson(res.choices[0]?.message?.content || "{}"));
    } catch(e) { return { fullAnswer: "Erro no Oráculo.", shortSummary: "Erro." }; }
};

export const fetchAkose = async (oduName: string, category: string, problem: string, lang: string): Promise<AkoseV4> => {
    const fallback: AkoseV4 = { tipo: 'akose', titulo_yoruba: "Erro", finalidade: problem, materiais: [], modo_preparo_sacerdotal: "Sem conexão.", ofo_ativacao: { yoruba: "", portugues: "", fonetica: "" }, visualizacao_consulente: { orcamento: true, finalidade: true, preparo: false } };
    if (!ai) { initializeAI(); }
    if (!ai) return fallback;
    try {
        const res = await ai.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            response_format: { type: "json_object" },
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `Gere um Akose (remédio litúrgico) para o problema: "${problem}" (categoria: ${category}) no Odu ${oduName}. JSON: { "tipo": "akose", "titulo_yoruba": "...", "finalidade": "...", "materiais": [], "modo_preparo_sacerdotal": "...", "oduReference": "...", "ofo_ativacao": { "yoruba": "...", "portugues": "...", "fonetica": "..." }, "visualizacao_consulente": { "orcamento": true, "finalidade": true, "preparo": false } }` }
            ]
        });
        return { ...fallback, ...JSON.parse(cleanJson(res.choices[0]?.message?.content || "{}")) };
    } catch(e) { return fallback; }
};

export const interpretDream = async (dream: string, lang: string) => {
    if (!ai) initializeAI();
    if (!ai) return { meaning: "Offline", relatedOdu: "N/A", advice: "Verifique conexão.", isPositive: true };
    try {
        const res = await ai.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            response_format: { type: "json_object" },
            messages: [{ role: "user", content: `Interprete este sonho à luz de Ifá (Babalawo): "${dream}". JSON: { "meaning": "...", "relatedOdu": "...", "advice": "...", "isPositive": true }` }]
        });
        return JSON.parse(cleanJson(res.choices[0]?.message?.content || "{}"));
    } catch(e) { return { meaning: "Erro", relatedOdu: "N/A", advice: "Tente novamente.", isPositive: false }; }
};

export const askSangoJustice = async (myName: string, opponent: string, details: string): Promise<SangoJusticeResult> => {
    const blank: EboDetail = { description: "", instructions: "", ingredients: [] };
    if (!ai) initializeAI();
    try {
        const res = await ai!.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            response_format: { type: "json_object" },
            messages: [{ role: "user", content: `Babalawo. Consulta de Justiça com Xangô. Meu nome: ${myName}. Adversário: ${opponent}. Situação: ${details}. JSON: { "name": "Odu", "outcome": "victory_hard|peace|trouble", "advice": "...", "akose": "...", "ofo": "...", "ebos": { "basic": {}, "medium": {}, "complete": {} } }` }]
        });
        return { name: "Xangô", outcome: "trouble", advice: "...", akose: "", ofo: "", ebos: { basic: blank, medium: blank, complete: blank }, ...JSON.parse(cleanJson(res.choices[0]?.message?.content || "{}")) };
    } catch(e) { return { name: "Xangô", outcome: "trouble", advice: "Erro de conexão.", akose: "", ofo: "", ebos: { basic: blank, medium: blank, complete: blank } }; }
};

export const searchYorubaDictionary = async (term: string) => {
    if (!ai) initializeAI();
    try {
        const res = await ai!.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            response_format: { type: "json_object" },
            messages: [{ role: "user", content: `Dicionário Yoruba. Termo: "${term}". JSON: { "word": "${term}", "meaning": "...", "usage": "...", "examples": [] }` }]
        });
        return JSON.parse(cleanJson(res.choices[0]?.message?.content || "{}"));
    } catch(e) { return { word: term, meaning: "Erro na busca." }; }
};

export const identifyPlant = async (imageBase64: string, lang: string) => {
    if (!ai) initializeAI();
    try {
        const res = await ai!.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            response_format: { type: "json_object" },
            messages: [{ role: "user", content: `Babalawo. Identifique uma erva sagrada de Ifá e sua importância litúrgica. JSON: { "yorubaName": "...", "scientificName": "...", "commonName": "...", "spiritualUse": "...", "oduReference": "...", "imageUrl": "" }` }]
        });
        return JSON.parse(cleanJson(res.choices[0]?.message?.content || "{}"));
    } catch(e) { return { yorubaName: "Ewe", scientificName: "N/A", commonName: "N/A", spiritualUse: "Erro.", oduReference: "", imageUrl: "" }; }
};

export const searchAjogunRemedy = async (query: string, lang: string) => {
    if (!ai) initializeAI();
    try {
        const res = await ai!.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            response_format: { type: "json_object" },
            messages: [{ role: "user", content: `Babalawo. Diagnóstico de Ajogun para: "${query}". JSON: { "ajogunName": "...", "spiritualCause": "...", "suggestedRemedy": "..." }` }]
        });
        return JSON.parse(cleanJson(res.choices[0]?.message?.content || "{}"));
    } catch(e) { return { ajogunName: "...", spiritualCause: "...", suggestedRemedy: "..." }; }
};

export const analyzeFace = async (imageBase64: string, lang: string) => ({ emotionalState: "Análise indisponível.", oriDiagnosis: "...", recommendation: "..." });
export const compareAncestry = async (i1: string, i2: string, lang: string) => ({ similarityScore: 0, facialAnalysis: "...", spiritualConnection: "...", ancestralAdvice: "..." });
export const analyzeAnimalSymbolism = async (imageBase64: string, lang: string) => ({ animalName: "...", spiritualMeaning: "...", omenType: "Neutral", relatedOrisha: "...", actionRequired: "..." });
export const fetchOriki = async (query: string, lang: string) => ({ title: query, yoruba: "...", translation: "..." });
export const analyzeOpeleImage = async (b64: string) => ({ rightLeg: ['open','open','open','open'] as any, leftLeg: ['open','open','open','open'] as any });
export const fetchLibraryAkose = async (q: string, l: string) => ({ results: [] });
export const hasValidKey = () => !!ai;
export const setManualKey = (k: string) => { localStorage.setItem('ifa_manual_key', k); initializeAI(); };

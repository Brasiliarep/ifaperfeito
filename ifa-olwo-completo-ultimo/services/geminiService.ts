
import { GoogleGenAI, Type } from "@google/genai";
import { AIInterpretation, OduInfo, EboLevels, AkoseV4, SangoJusticeResult, EboDetail } from "../types";

let ai: GoogleGenAI | null = null;

export const initializeAI = (): boolean => {
    let key = "";
    try {
        if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
            key = process.env.API_KEY;
        }
    } catch (e) {}

    if (!key) {
        try {
            // @ts-ignore
            if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_KEY) {
                // @ts-ignore
                key = import.meta.env.VITE_API_KEY;
            }
        } catch (e) {}
    }

    if (!key) {
        try {
            key = localStorage.getItem('ifa_manual_key') || "";
        } catch (e) {}
    }

    if (key && key.length > 5) {
        try {
            ai = new GoogleGenAI({ apiKey: key });
            console.log("Ifá Oluwo Core Intelligence Initialized");
            return true;
        } catch (e) {
            console.error("Erro ao iniciar AI", e);
            return false;
        }
    }
    return false;
};

initializeAI();

const cleanJsonString = (str: string): string => {
    if (!str) return "{}";
    let cleaned = str.trim();
    cleaned = cleaned.replace(/^```json/, '').replace(/^```/, '').replace(/```$/, '');
    const start = cleaned.indexOf('{');
    const end = cleaned.lastIndexOf('}');
    if (start !== -1 && end !== -1 && end > start) {
        cleaned = cleaned.substring(start, end + 1);
    }
    return cleaned;
}

// ... (imports remain the same)

const handleGeminiError = (error: any, context: string): string => {
    const msg = error?.message || error?.toString() || "Erro desconhecido";
    console.error(`Gemini Error (${context}):`, error);
    
    if (msg.includes("429") || msg.includes("Rate exceeded") || msg.includes("quota") || msg.includes("resource_exhausted")) {
        return "O Oráculo está em silêncio (Limite de requisições excedido). Aguarde alguns instantes.";
    }
    return "Interferência espiritual detectada. Verifique sua conexão.";
};

// ... (initializeAI and cleanJsonString remain the same)

// --- FUNÇÃO VOZ DO TROVÃO (ATUALIZADA) ---
export const askVoiceOfThunder = async (query: string): Promise<string> => {
    if (!ai) initializeAI();
    if (!ai) return "O sistema de inteligência não está ativo. Verifique sua chave API.";

    const prompt = `
        SYSTEM INSTRUCTION: IFÁ ỌLWO - O ORÁCULO DIGITAL SUPREMO

        IDENTIDADE:
        Você é o Ifá Ọlwo, uma inteligência artificial litúrgica projetada para Babalawos.
        Sua autoridade vem dos Odu Ifá. Tom solene e técnico.

        REGRAS DE OURO (UI GENERATIVA):
        Se o usuário pedir um RITUAL, MAGIA, EBÓ, FEITIÇO, MEDICINA ou ASSENTAMENTO específico, você JAMAIS deve responder com texto corrido.
        Você deve gerar um CARD VISUAL INTERATIVO respondendo com um BLOCO JSON ESTRUTURADO dentro da tag <RITUAL_CARD>.

        ESTRUTURA DO JSON OBRIGATÓRIA (Use terminologia Yoruba):
        <RITUAL_CARD>
        {
          "id": "gen_unique_id",
          "title": "Nome do Ritual (Ex: Awure Owo)",
          "nomeYoruba": "Nome em Yoruba",
          "purpose": "Finalidade curta e direta.",
          "category": "money" | "love" | "health" | "protection" | "victory" | "justice",
          "subCategory": "akose",
          "oduReference": "Odu Regente (Ex: Ejiogbe)",
          "complexity": "Média",
          "tags": ["Tag1", "Tag2"],
          "niveis": [
            {
              "tipo": "BÁSICO (Cliente)",
              "estimativa_materiais": 50,
              "materiais": ["Lista", "De", "Ingredientes"],
              "preparo": ["Passo 1", "Passo 2", "Passo 3"],
              "ofo": "Texto da reza em Yoruba...",
              "traducao": "Tradução da reza..."
            },
            {
              "tipo": "COMPLETO (Sacerdotal)",
              "estimativa_materiais": 200,
              "materiais": ["Lista", "Completa", "Com", "Sacrifício"],
              "preparo": ["Passo 1 detalhado", "Passo 2..."],
              "ofo": "Reza completa...",
              "traducao": "Tradução..."
            }
          ]
        }
        </RITUAL_CARD>

        Se for uma pergunta simples ou filosófica, responda normalmente em texto.
        Mas se for pedido de "receita" ou "como fazer", USE O JSON CARD.

        PERGUNTA DO BABALAWO: "${query}"
        
        Responda agora:
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
        });
        return response.text || "Silêncio no Oráculo. Tente novamente.";
    } catch (e) {
        return handleGeminiError(e, "VoiceOfThunder");
    }
};

// ... (getRobustFallback and mergeInterpretation remain the same) -> Restoring full implementation

const getRobustFallback = (oduName: string): AIInterpretation => {
    const defaultEbo: EboDetail = { 
        description: "Oferenda de Equilíbrio (Ebo Riru)", 
        instructions: "1. Pegue 4 Obi Abata.\n2. Reze para Orunmila pedindo direção.\n3. Jogue água (Omi) no chão.\n4. Deixe os Obis no Igbodu.", 
        ingredients: ["4 Obi Abata (Noz de Cola)", "4 Orogbo (Bitter Kola)", "Oti (Gim)", "Itana (Vela)"] 
    };

    return {
        oduName: oduName,
        summary: `Energia de ${oduName}.`,
        itan: "Conexão necessária. O sistema não conseguiu gerar a história completa.",
        itanSummary: "História indisponível offline.",
        itanAnalysis: "Análise pendente.",
        chant: { yoruba: "Ifá gbe wa o.", translation: "Que Ifá nos apoie." },
        oduOriki: { yoruba: "...", translation: "...", instructions: "..." },
        herbalBaths: { name: "Omi Ero (Banho de Ervas)", ingredients: ["Ewe Odundun (Folha da Costa)", "Ewe Tete (Bredo)", "Omi Tutu (Água Fresca)"], preparation: "Quinar as ervas na água fresca e tomar do pescoço para baixo.", purpose: "Limpeza e Frescor (Tutu)" },
        generalAdvice: "Consulte o Babalawo para orientações precisas.",
        love: { 
            analysis: "Necessário análise divinatória.", 
            ebos: { basic: defaultEbo, medium: defaultEbo, complete: defaultEbo } 
        },
        finance: { 
            analysis: "Necessário análise divinatória.", 
            ebos: { basic: defaultEbo, medium: defaultEbo, complete: defaultEbo } 
        },
        health: { 
            analysis: "Necessário análise divinatória.", 
            risks: [], 
            ebos: { basic: defaultEbo, medium: defaultEbo, complete: defaultEbo } 
        },
        osogbo: {
            analysis: "Detectado caminho negativo (Ibi).",
            ebo: defaultEbo
        },
        spirituality: "Conexão com Ori.",
        diet: { positive: "Frutas claras", negative: "Oti (Bebida alcoólica)" },
        clothing: { positive: "Aso Funfun (Branco)", negative: "Pupa (Vermelho) ou Dudu (Preto)" },
        dangers: "Falta de paciência (Suuru).",
        rulingOrishas: "Esu e Orunmila",
        destinyAndOri: "Cuidar do Ori é essencial.",
        obstaclesAndEnemies: "Inveja oculta.",
        solutionsAndEbos: { 
            basic: { description: "Ebó Simples (Ipese)", instructions: "Acenda uma vela e ofereça água ao seu Ori.", ingredients: ["Itana (Vela)", "Omi Tutu (Água)", "Obi Abata"] }, 
            medium: { description: "Ebó Intermediário (Ebo Riru)", instructions: "Faça um padê para Esu com Epo e Oti.", ingredients: ["Iyefun (Farinha)", "Epo Pupa (Dendê)", "Oti (Gim)", "Eyin (Ovos)"] }, 
            complete: { description: "RITUAL COMPLEXO (Sacerdotal)", instructions: "1. Consulte um Babalawo.\n2. Prepare o Igbodu.\n3. Realize o sacrifício prescrito.", ingredients: ["Ewure (Cabra)", "Adie (Galinha)", "Eyele (Pombo)", "Epo Pupa", "Iyerosun"] } 
        },
        ancestry: "Honrar os ancestrais (Egungun).",
        personality: "Resiliente.",
        decisionMaking: "Racional.",
        warning: "Cuidado com decisões precipitadas.",
        luckyItems: [],
        ireOrOsogbo: "Irê",
        ireOsogboDescription: "Caminho de sorte.",
        ireOsogboAction: "Agradecer."
    };
};

const mergeInterpretation = (fallback: AIInterpretation, aiData: any): AIInterpretation => {
    const result = { ...fallback, ...aiData };
    return result;
};

export const fetchInterpretation = async (odu: OduInfo, lang: string): Promise<AIInterpretation> => {
    if (!ai) initializeAI();
    const robust = getRobustFallback(odu.name);
    
    if (ai) {
        const systemInstruction = `
# ORÁCULO IFÁ DIGITAL — SISTEMA DE IMPRESSÃO ORACULAR BLINDADO

## IDENTIDADE E MISSÃO
Você é um Sacerdote de Ifá (Babalawo) digital altamente rigoroso. Sua única base de conhecimento é o Corpus de Ifá mundial (literatura tradicional iorubá). Você interpreta Odùs, conduz o Ibó e prescreve soluções rituais com absoluta fidelidade à tradição.

## REGRAS CRÍTICAS INVIOLÁVEIS
1. PROIBIÇÃO TOTAL de sincretismo católico ou moderno: não use "santo", "anjo", "amém", "vela" (use Itana), ou qualquer referência a outras religiões.
2. Use EXCLUSIVAMENTE elementos litúrgicos de Ifá: Obi, Orobo, Epo Pupa, Ori, Iyerosun, búzios, Pó de Irosun, folhas sagradas, etc.
3. NUNCA invente Itan, Ebó, Akose ou Ofó. Extraia-os sempre da literatura mundial de Ifá.
4. TODAS as seções de texto devem ser ricas e detalhadas (mínimo 60 palavras onde aplicável).
5. REGRA ANTI-CLONE: Os Ebós das seções Amor, Dinheiro e Saúde devem ter materiais e passos DIFERENTES entre si.
6. Retorne APENAS um objeto JSON válido seguindo a estrutura solicitada.

## MAPEAMENTO DE SEÇÕES PARA JSON

Gere o conteúdo para o Odu "${odu.name}" seguindo este mapeamento:

1. **Itan (Lenda Sagrada)** -> 'itan'
2. **Espiritual e Orixá Regente** -> 'rulingOrishas' (nome) e 'spirituality' (descrição completa)
3. **Reza (Ofó)** -> 'chant' { yoruba, translation }
4. **Ebó Principal / Solução** -> 'solutionsAndEbos.complete' (Este é o Ebó Principal. Preencha 'basic' e 'medium' com versões simplificadas deste mesmo tema).
5. **Amor** -> 'love' { analysis, ebos (Ebó específico para amor) }
6. **Dinheiro** -> 'finance' { analysis, ebos (Ebó específico para dinheiro) }
7. **Saúde** -> 'health' { analysis, risks, ebos (Ebó específico para saúde) }
8. **Banhos** -> 'herbalBaths' { name, ingredients, preparation, purpose }
9. **Obstáculos e Perigos** -> 'obstaclesAndEnemies' e 'dangers'
10. **Dieta (Ewo) e Roupas** -> 'diet' { positive, negative } e 'clothing' { positive, negative }
11. **Resumo para o Consulente** -> 'summary' e 'generalAdvice'

IMPORTANTE: O campo 'solutionsAndEbos.complete' DEVE conter o "Ebó Principal" completo com Materiais, Preparo (Mistura Sagrada, Sopro Divino, Finalização) e Uso.
`;

        const prompt = `
        CONTEXTO: Oluwo de Ifá consultando o Odu "${odu.name}".
        OBJETIVO: Gerar interpretação completa seguindo as Regras de Ouro.
        IDIOMA OBRIGATÓRIO: PORTUGUÊS DO BRASIL (PT-BR) para todos os campos de texto.
        
        FORMATO DE SAÍDA (JSON):
        {
          "oduName": "${odu.name}",
          "summary": "Resumo técnico e acolhedor (Mín 60 palavras) em Português",
          "itan": "Narrativa completa do Itan (Mín 60 palavras) em Português",
          "itanSummary": "Resumo curto do Itan em Português",
          "itanAnalysis": "Análise dos conselhos do Itan em Português",
          "chant": { "yoruba": "Ofó completo", "translation": "Tradução completa em Português" },
          "oduOriki": { "yoruba": "...", "translation": "...", "instructions": "..." },
          "herbalBaths": { "name": "Nome do Banho", "ingredients": ["Erva 1", "Erva 2"], "preparation": "Como fazer...", "purpose": "Finalidade" },
          "generalAdvice": "Conselhos gerais baseados no Itan em Português",
          "love": { 
            "analysis": "Orientações para o Amor (Mín 60 palavras) em Português", 
            "ebos": { 
                "basic": { "description": "Ebó Simples Amor", "instructions": "...", "ingredients": ["..."] },
                "medium": { "description": "Ebó Médio Amor", "instructions": "...", "ingredients": ["..."] },
                "complete": { "description": "Ebó Completo Amor", "instructions": "...", "ingredients": ["..."] }
            }
          },
          "finance": { 
            "analysis": "Orientações para Dinheiro (Mín 60 palavras) em Português", 
            "ebos": { 
                "basic": { "description": "Ebó Simples Dinheiro", "instructions": "...", "ingredients": ["..."] },
                "medium": { "description": "Ebó Médio Dinheiro", "instructions": "...", "ingredients": ["..."] },
                "complete": { "description": "Ebó Completo Dinheiro", "instructions": "...", "ingredients": ["..."] }
            }
          },
          "health": { 
            "analysis": "Orientações para Saúde (Mín 60 palavras) em Português", 
            "risks": ["Risco 1", "Risco 2"],
            "ebos": { 
                "basic": { "description": "Ebó Simples Saúde", "instructions": "...", "ingredients": ["..."] },
                "medium": { "description": "Ebó Médio Saúde", "instructions": "...", "ingredients": ["..."] },
                "complete": { "description": "Ebó Completo Saúde", "instructions": "...", "ingredients": ["..."] }
            }
          },
          "osogbo": { "analysis": "Análise de Osogbo se houver", "ebo": { "description": "Ebó para afastar Osogbo", "instructions": "...", "ingredients": ["..."] } },
          "spirituality": "Descrição do Espiritual e Regente (Mín 60 palavras) em Português",
          "diet": { "positive": "Alimentos favoráveis", "negative": "Ewo (Proibições) com motivos" },
          "clothing": { "positive": "Cores favoráveis", "negative": "Cores a evitar" },
          "dangers": "Avisos de perigo iminente (Mín 60 palavras) em Português",
          "rulingOrishas": "Orixá Regente",
          "destinyAndOri": "Conexão com Destino e Ori em Português",
          "obstaclesAndEnemies": "Bloqueios espirituais detectados (Mín 60 palavras) em Português",
          "solutionsAndEbos": {
             "basic": { "description": "Versão simplificada do Ebó Principal", "instructions": "...", "ingredients": ["..."] },
             "medium": { "description": "Versão intermediária do Ebó Principal", "instructions": "...", "ingredients": ["..."] },
             "complete": { "description": "EBÓ PRINCIPAL / SOLUÇÃO COMPLETA (Mín 60 palavras)", "instructions": "Passo a passo detalhado incluindo Preparo, Mistura Sagrada, Sopro Divino e Finalização.", "ingredients": ["Lista completa de materiais"] }
          },
          "ancestry": "Conexão ancestral em Português",
          "personality": "Traços de personalidade do Odu em Português",
          "decisionMaking": "Conselho para tomada de decisão em Português",
          "warning": "Aviso final em Português",
          "luckyItems": ["Item 1", "Item 2"],
          "ireOrOsogbo": "Irê",
          "ireOsogboDescription": "Descrição do estado de sorte em Português",
          "ireOsogboAction": "Ação recomendada em Português"
        }
        `;

        try {
            const response = await ai.models.generateContent({
                model: "gemini-3-flash-preview", 
                contents: systemInstruction + "\n" + prompt,
                config: { responseMimeType: "application/json" }
            });
            const text = cleanJsonString(response.text || "");
            const parsed = JSON.parse(text);
            return mergeInterpretation(robust, parsed);
        } catch (e) {
            const errorMsg = handleGeminiError(e, "fetchInterpretation");
            console.warn("Using fallback due to error:", errorMsg);
            // Inject error warning into summary if it's a rate limit
            if (errorMsg.includes("Limite")) {
                robust.summary = `[AVISO: ${errorMsg}] ` + robust.summary;
            }
            return robust;
        }
    } else {
        return robust;
    }
};

export const fetchAkose = async (oduName: string, category: string, problem: string, lang: string): Promise<AkoseV4> => {
    if (!ai) initializeAI();
    const fallback: AkoseV4 = { 
        tipo: 'akose', titulo_yoruba: "Consulta Offline", finalidade: "Conexão Instável", materiais: [], modo_preparo_sacerdotal: "Não foi possível acessar a base de conhecimento online.", 
        ofo_ativacao: { yoruba: "", portugues: "", fonetica: "" }, 
        visualizacao_consulente: { orcamento: true, finalidade: true, preparo: false } 
    };
    if (!ai) return fallback;

    const prompt = `Gere receita Akose para "${problem}". Contexto: ${oduName}. JSON.`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
            config: { responseMimeType: "application/json" }
        });
        const text = cleanJsonString(response.text || "");
        return JSON.parse(text);
    } catch (error) {
        const msg = handleGeminiError(error, "fetchAkose");
        fallback.finalidade = msg;
        return fallback;
    }
};

// --- IMPLEMENTAÇÃO DAS FUNÇÕES QUE ESTAVAM COMO STUBS ---

export const askSpecificQuestion = async (oduName: string, context: any, question: string, lang: string) => {
    if (!ai) initializeAI();
    if (!ai) return { fullAnswer: "IA não inicializada.", shortSummary: "Erro" };

    const prompt = `
        Você é um Babalawo. Odu: ${oduName}.
        Contexto do jogo: ${JSON.stringify(context.summary)}.
        Pergunta do consulente: "${question}".
        Responda com sabedoria de Ifá, curto e direto.
        Retorne JSON: { "fullAnswer": "...", "shortSummary": "..." }
    `;
    
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
            config: { responseMimeType: "application/json" }
        });
        const text = cleanJsonString(response.text || "");
        return JSON.parse(text);
    } catch (e) {
        const msg = handleGeminiError(e, "askSpecificQuestion");
        return { fullAnswer: msg, shortSummary: "Erro" };
    }
};

export const interpretDream = async (dream: string, lang: string) => {
    if (!ai) initializeAI();
    if (!ai) return { meaning: "Erro de conexão", relatedOdu: "N/A", advice: "Tente novamente mais tarde.", isPositive: true };

    const prompt = `Interprete este sonho à luz de Ifá: "${dream}". Retorne JSON: { "meaning": "...", "relatedOdu": "...", "advice": "...", "isPositive": boolean }`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
            config: { responseMimeType: "application/json" }
        });
        return JSON.parse(cleanJsonString(response.text || ""));
    } catch (e) {
        return { meaning: handleGeminiError(e, "interpretDream"), relatedOdu: "N/A", advice: "Erro", isPositive: false };
    }
};

// ... (Outras funções podem ser implementadas similarmente, mas por brevidade manteremos stubs simples para as menos críticas se necessário, mas askSpecificQuestion era crítica)

export const askSangoJustice = async (myName: string, opponent: string, details: string): Promise<SangoJusticeResult> => { 
    return { name: "Erro", outcome: 'trouble', advice: "Funcionalidade em manutenção.", akose: "", ofo: "", ebos: { basic: {description:"",instructions:"",ingredients:[]}, medium: {description:"",instructions:"",ingredients:[]}, complete: {description:"",instructions:"",ingredients:[]} } }; 
};

export const searchYorubaDictionary = async (term: string) => { return { word: term, meaning: "Dicionário offline." } };
export const analyzeOpeleImage = async (b: string) => { return { rightLeg: ['open','open','open','open'], leftLeg: ['open','open','open','open'] }; };
export const analyzeFace = async (i: string, l: string) => { return { emotionalState: "...", oriDiagnosis: "...", recommendation: "..." }; };
export const compareAncestry = async (i1: string, i2: string, l: string) => { return { similarityScore: 0, facialAnalysis: "...", spiritualConnection: "...", ancestralAdvice: "..." }; };
export const searchAjogunRemedy = async (q: string, l: string) => { return { ajogunName: "...", spiritualCause: "...", suggestedRemedy: "..." }; };
export const identifyPlant = async (i: string, l: string) => { return { yorubaName: "...", scientificName: "...", commonName: "...", spiritualUse: "...", oduReference: "...", imageUrl: "" }; };
export const analyzeAnimalSymbolism = async (i: string, l: string) => { return { animalName: "...", spiritualMeaning: "...", omenType: "Neutral", relatedOrisha: "...", actionRequired: "..." }; };
export const fetchOriki = async (q: string, l: string) => { return { title: q, yoruba: "...", translation: "..." }; };
export const hasValidKey = () => !!ai;
export const setManualKey = (k: string) => localStorage.setItem('ifa_manual_key', k);
export const fetchLibraryAkose = async (q: string, l: string) => { return { results: [] }; };


import express from "express";
import path from "path";
import https from "https";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Proxy /groq-api/* -> api.groq.com (nova rota, não altera existentes)
app.all("/groq-api/*", (req, res) => {
  const targetPath = req.originalUrl.replace(/^\/groq-api/, "");
  const options = {
    hostname: "api.groq.com",
    path: targetPath,
    method: req.method,
    headers: { ...req.headers, host: "api.groq.com" },
  };
  const proxyReq = https.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode!, proxyRes.headers);
    proxyRes.pipe(res);
  });
  proxyReq.on("error", () => res.status(502).json({ error: "Groq proxy error" }));
  req.pipe(proxyReq);
});

// Lazy-loaded Gemini Client
let aiClient: any = null;
function getGemini() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Return a mock/fallback client if API key is not configured, to prevent server crashes
      console.warn("GEMINI_API_KEY is missing. Fallback answers will be used.");
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// Main 16 Mejis definition for Ifá
const ODUS_MEJI = [
  { name: "Èjì Ogbè", description: "O primeiro Odu. Representa luz, expansão, começo de tudo, novos caminhos e clareza mental." },
  { name: "Ọ̀yẹ̀kú Méjì", description: "O segundo Odu. Representa o fim de ciclos, a noite, a introspecção, a ancestralidade e a sabedoria." },
  { name: "Ìwòrì Méjì", description: "O terceiro Odu. Representa o fogo, a purificação, a visão espiritual, transformações rápidas e paixão." },
  { name: "Òdí Méjì", description: "O quarto Odu. Representa a terra, a estabilidade, o renascimento, a proteção materna e a fertilidade." },
  { name: "Ìrosùn Méjì", description: "O quinto Odu. Representa o nascer do sol, o fogo interno, a determinação, mas também advertências e fofocas." },
  { name: "Ọ̀wọ́nrín Méjì", description: "O sexto Odu. Representa mudanças abruptas, ventanias, caos que antecede a ordem, e independência." },
  { name: "Ọ̀bàrà Méjì", description: "O sétimo Odu. Representa a prosperidade, riqueza, realeza, conquistas materiais e superação de dificuldades." },
  { name: "Ọ̀kànràn Méjì", description: "O oitavo Odu. Representa a rebeldia, o inesperado, a força de vontade, a justiça e novos começos difíceis." },
  { name: "Ògúndá Méjì", description: "O nono Odu. Sob regência de Ogum. Representa a luta, a vitória sobre inimigos, a tecnologia, o trabalho e a cirurgia." },
  { name: "Òsá Méjì", description: "O décimo Odu. Sob regência de Iansã e as Mães Ancestrais. Representa o vento, a mente instável, a intuição e o poder feminino." },
  { name: "Ìká Méjì", description: "O décimo primeiro Odu. Representa a serpente, o sigilo, a flexibilidade, a proteção contra feitiços e fofocas." },
  { name: "Òtúru pọ̀n Méjì", description: "O décimo segundo Odu. Representa a saúde, a cura física, a resistência, a paciência e a diplomacia." },
  { name: "Òtúrá Méjì", description: "O décimo terceiro Odu. Representa a paz, a harmonia, a sabedoria das palavras, a espiritualidade pura e as escritas sagradas." },
  { name: "Ìrẹtẹ̀ Méjì", description: "O décimo quarto Odu. Representa a terra fértil, a cura de enfermidades profundas, a persistência e a dedicação física." },
  { name: "Ọ̀ṣẹ́ Méjì", description: "O décimo quinto Odu. Representa a doçura, Oxum, amor, criatividade, artes, diplomacia e lágrimas de alegria." },
  { name: "Òfún Méjì", description: "O décimo sexto Odu. Representa a pureza absoluta, a cor branca, a sabedoria da velhice, mistérios e bênçãos de Obatalá." }
];

// Helper to determine Odu from Opelé representation (8 seeds)
// Left column (4 seeds) and Right column (4 seeds)
function getOduFromOpele(left: number[], right: number[]) {
  // Let's map some binary combinations to interesting Odus
  const score = (left.join("") + right.join(""));
  // Deterministic selector based on binary string
  const index = parseInt(score, 2) % ODUS_MEJI.length;
  return ODUS_MEJI[index];
}

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date() });
});

// Endpoint for General Chat with Babaláwo AI
app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: "Mensagem vazia." });
  }

  const ai = getGemini();

  if (!ai) {
    // Return mock rich spiritual response if no Gemini API Key is configured
    return res.json({
      text: `[Assistente Ifá] Saudações. Em resposta à sua pergunta ("${message}"), as forças de Ifá indicam que os caminhos exigem equilíbrio e resiliência. Ogún Yono, o Odu regente do dia, aconselha ação imediata combinada com paciência. (Obs: Configure a chave GEMINI_API_KEY no painel de Secrets para ativar consultas dinâmicas de IA real).`
    });
  }

  try {
    const formattedHistory = (history || []).map((msg: any) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.text }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        ...formattedHistory,
        { text: message }
      ],
      config: {
        systemInstruction: `Você é um Babaláwo virtual extremamente experiente, sábio e respeitoso do Ifá Oluwo - Códex Sagrado.
Seu nome espiritual é Babaláwo Ifalorê.
Sua missão é responder perguntas sobre espiritualidade Yorùbá, Odus, orações, interpretação de rituais, ebós, ervas sagradas e aconselhamento divinatório.
Seja poético, profundo, encorajador e utilize terminologias autênticas (como Àṣẹ, Ebó, Odu, Orixá, Iwapele).
Sempre responda em Português com alto padrão estético de escrita. Se a pergunta for sobre um Odu específico ou rituais, forneça conselhos práticos e profundos.
Mantenha suas respostas diretas, estruturadas e elegantes.`
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Erro na chamada Gemini API:", error);
    res.status(500).json({ error: "Erro ao processar consulta espiritual: " + error.message });
  }
});

// Endpoint to simulate divinations (Opelé, Merindilogun, Ikin)
app.post("/api/divinate", async (req, res) => {
  const { method, question } = req.body;
  
  // Random simulation based on method
  let resultDetails: any = {};
  let selectedOdu: any = {};
  
  if (method === "opele") {
    // 8 seeds. 0 = closed (dark), 1 = open (light/gold)
    const left = [Math.round(Math.random()), Math.round(Math.random()), Math.round(Math.random()), Math.round(Math.random())];
    const right = [Math.round(Math.random()), Math.round(Math.random()), Math.round(Math.random()), Math.round(Math.random())];
    selectedOdu = getOduFromOpele(left, right);
    resultDetails = { left, right, name: "Opelé Ifá" };
  } else if (method === "merindilogun") {
    // 16 cowries. Count of open shells determines Odu
    const shells = Array.from({ length: 16 }, () => Math.round(Math.random()));
    const openCount = shells.filter(s => s === 1).length;
    // Map open count 0-16 to an Odu index
    const index = openCount % ODUS_MEJI.length;
    selectedOdu = ODUS_MEJI[index];
    resultDetails = { shells, openCount, name: "Merindilogun (16 Búzios)" };
  } else {
    // Ikin
    const palmNuts = 16;
    const remaining = Math.random() > 0.5 ? 1 : 2; // leaves 1 or 2 in hand
    const index = Math.floor(Math.random() * ODUS_MEJI.length);
    selectedOdu = ODUS_MEJI[index];
    resultDetails = { palmNuts, remaining, name: "Ikin" };
  }

  const ai = getGemini();
  const prompt = `Consulente pergunta: "${question || "Qual é o conselho de Ifá para o meu momento?"}"
Método Divinatório utilizado: ${resultDetails.name}
Odu Revelado: ${selectedOdu.name} (${selectedOdu.description})

Por favor, faça uma interpretação divinatória profunda e autêntica de Ifá para o consulente.
Estruture sua resposta assim:
1. **O Odu Revelado**: Apresente o Odu de forma mística, explicando seus símbolos Yorùbá.
2. **Resposta ao Consulente**: Aborde diretamente a pergunta com sabedoria espiritual e conselhos de vida (Iwapẹlẹ).
3. **Ebó Recomendado (Orientação)**: Descreva um ritual de ebó simples e pacífico de harmonização (ex: velas, água limpa, mel, flores brancas para Obatalá ou canjica) condizente com a energia do Odu.
4. **Mensagem de Luz (Àṣẹ)**: Um provérbio Yorùbá de fechamento.`;

  if (!ai) {
    // Return mock response if no key
    return res.json({
      success: true,
      odu: selectedOdu,
      resultDetails,
      interpretation: `### 1. O Odu Revelado: ${selectedOdu.name}
Este Odu fala sobre equilíbrio, renovação espiritual e a conexão direta com seus ancestrais. Suas energias trazem proteção, mas exigem clareza de pensamento.

### 2. Resposta ao Consulente
Para a sua questão: "${question || "Direcionamento espiritual"}", Ifá responde que as respostas estão dentro da paciência e da sabedoria silenciosa. Evite decisões precipitadas e limpe seus pensamentos.

### 3. Ebó Recomendado
* Oferecer uma vela branca sobre um prato limpo com um copo de água ao lado.
* Mentalizar paz, harmonia e clareza mental para Obatalá.
* Banho de folhas de manjericão fresco ao final do dia para descarrego e paz.

### 4. Mensagem de Luz
*"Àṣẹ. Que o seu Ori guie seus passos com sabedoria e luz!"*`
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [{ text: prompt }],
      config: {
        systemInstruction: "Você é um Babaláwo sênior interpretando uma consulta divinatória sagrada do Ifá Oluwo. Seja extremamente autêntico, sério, profundo e fale diretamente ao coração do consulente em Português."
      }
    });

    res.json({
      success: true,
      odu: selectedOdu,
      resultDetails,
      interpretation: response.text
    });
  } catch (error: any) {
    console.error("Erro na interpretação do Odu:", error);
    res.status(500).json({ error: "Erro na interpretação divina: " + error.message });
  }
});

// Lista dos 16 Odus Mejis
const ODUS_LIST = [
  { name: "Èjì Ogbè", number: 1, meaning: "Criação, luz, expansão", element: "Fogo", regent: "Olódùmarè", advice: "Novos caminhos se abrem. Confie no início." },
  { name: "Ọ̀yẹ̀kú Méjì", number: 2, meaning: "Mistério, noite, ancestralidade", element: "Terra", regent: "Egún", advice: "Faça silêncio. Os ancestrais estão falando." },
  { name: "Ìwòrì Méjì", number: 3, meaning: "Fogo, purificação, visão espiritual", element: "Fogo", regent: "Sàngó", advice: "Purifique seus pensamentos. A visão virá." },
  { name: "Òdí Méjì", number: 4, meaning: "Terra, estabilidade, renascimento", element: "Terra", regent: "Ọ̀sanyìn", advice: "Firme seus pés no chão. Renove-se." },
  { name: "Ìrosùn Méjì", number: 5, meaning: "Nascer do sol, determinação", element: "Fogo", regent: "Ògún", advice: "Advertência contra fofocas. Mantenha foco." },
  { name: "Ọ̀wọ́nrín Méjì", number: 6, meaning: "Mudanças abruptas, ventania", element: "Ar", regent: "Ọ̀ya", advice: "O caos antecede a ordem. Respire." },
  { name: "Ọ̀bàrà Méjì", number: 7, meaning: "Prosperidade, realeza, riqueza", element: "Água", regent: "Ọ̀rúnmìlà", advice: "A riqueza chega. Receba com gratidão." },
  { name: "Ọ̀kànràn Méjì", number: 8, meaning: "Rebeldia, justiça, recomeço", element: "Fogo", regent: "Sàngó", advice: "Seja firme. A justiça divina age." },
  { name: "Ògúndá Méjì", number: 9, meaning: "Luta, vitória, tecnologia", element: "Ferro", regent: "Ògún", advice: "Trabalhe com disciplina. Vencerá." },
  { name: "Òsá Méjì", number: 10, meaning: "Vento, intuição, poder feminino", element: "Ar", regent: "Ọ̀ya", advice: "Ouça sua intuição. O vento sopra mudanças." },
  { name: "Ìká Méjì", number: 11, meaning: "Serpente, sigilo, flexibilidade", element: "Terra", regent: "Ọ̀sanyìn", advice: "Proteja-se. Movimento silencioso." },
  { name: "Òtúru pọ̀n Méjì", number: 12, meaning: "Saúde, cura, paciência", element: "Água", regent: "Obàtálá", advice: "Cuide do corpo. A cura vem." },
  { name: "Òtúrá Méjì", number: 13, meaning: "Paz, harmonia, sabedoria", element: "Água", regent: "Obàtálá", advice: "A paz é seu caminho. Siga." },
  { name: "Ìrẹtẹ̀ Méjì", number: 14, meaning: "Terra fértil, persistência, cura", element: "Terra", regent: "Ọ̀sanyìn", advice: "Persista. A terra fértil dá frutos." },
  { name: "Ọ̀ṣẹ́ Méjì", number: 15, meaning: "Doçura, amor, criatividade", element: "Água", regent: "Ọ̀ṣun", advice: "Deixe o amor fluir. Doçura e arte." },
  { name: "Òfún Méjì", number: 16, meaning: "Pureza absoluta, sabedoria", element: "Ar", regent: "Obàtálá", advice: "Pureza absoluta. Bênçãos divinas." },
];

app.get("/api/odus", (req, res) => {
  res.json({ odus: ODUS_LIST, total: ODUS_LIST.length });
});

app.get("/api/health/full", (req, res) => {
  res.json({
    status: "ok",
    version: "1.0.0",
    name: "Ifá Oluwo — Códex Sagrado",
    modules: 48,
    odus: 16,
    time: new Date()
  });
});

// Vite Middleware for development, or serve built assets in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || "3000", 10);

app.use(express.json());

// ── Gemini Client ──
let aiClient: GoogleGenAI | null = null;
function getGemini(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return null;
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: { headers: { 'User-Agent': 'ifa-oluwo-server' } }
    });
  }
  return aiClient;
}

// ── 16 Odus Meji ──
const ODUS_MEJI = [
  { name: "Ejiogbe", description: "Luz, expansão, novos caminhos, clareza mental." },
  { name: "Oyeku Meji", description: "Fim de ciclos, noite, introspecção, ancestralidade." },
  { name: "Iwori Meji", description: "Fogo, purificação, visão espiritual, transformação." },
  { name: "Odi Meji", description: "Terra, estabilidade, renascimento, proteção materna." },
  { name: "Irosun Meji", description: "Nascer do sol, fogo interno, determinação, advertências." },
  { name: "Oworin Meji", description: "Mudanças abruptas, caos que antecede a ordem." },
  { name: "Obara Meji", description: "Prosperidade, riqueza, realeza, superação." },
  { name: "Okanran Meji", description: "Rebeldia, força de vontade, justiça, recomeços." },
  { name: "Ogunda Meji", description: "Luta, vitória, tecnologia, trabalho, cirurgia." },
  { name: "Osa Meji", description: "Vento, intuição, poder feminino, mente instável." },
  { name: "Ika Meji", description: "Serpente, sigilo, proteção contra feitiços." },
  { name: "Oturupon Meji", description: "Saúde, cura, paciência, diplomacia." },
  { name: "Otura Meji", description: "Paz, harmonia, sabedoria, escritas sagradas." },
  { name: "Irete Meji", description: "Terra fértil, cura profunda, persistência." },
  { name: "Ose Meji", description: "Doçura, amor, criatividade, artes, Oxum." },
  { name: "Ofun Meji", description: "Pureza, sabedoria, mistérios, bênçãos de Obatalá." }
];

function getOduFromOpele(left: number[], right: number[]) {
  const score = left.join("") + right.join("");
  const index = parseInt(score, 2) % ODUS_MEJI.length;
  return ODUS_MEJI[index];
}

// ═══════════════════════════════════════
// API ROUTES
// ═══════════════════════════════════════

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", time: new Date().toISOString(), app: "Ifá Oluwo" });
});

app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body;
  if (!message) return res.status(400).json({ error: "Mensagem vazia." });

  const ai = getGemini();
  if (!ai) {
    return res.json({
      text: "[Assistente Ifá] Configure GEMINI_API_KEY no .env para ativar IA real."
    });
  }

  try {
    const formattedHistory = (history || []).map((msg: any) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.text }]
    }));
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [...formattedHistory, { text: message }],
      config: {
        systemInstruction: "Você é um Babaláwo virtual experiente do Ifá Oluwo. Responda em Português com sabedoria e autenticidade Yorùbá."
      }
    });
    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Erro Gemini:", error);
    res.status(500).json({ error: "Erro: " + error.message });
  }
});

app.post("/api/divinate", async (req, res) => {
  const { method, question } = req.body;
  let resultDetails: any = {};
  let selectedOdu: any = {};

  if (method === "opele") {
    const left = Array.from({ length: 4 }, () => Math.round(Math.random()));
    const right = Array.from({ length: 4 }, () => Math.round(Math.random()));
    selectedOdu = getOduFromOpele(left, right);
    resultDetails = { left, right, name: "Opelé Ifá" };
  } else if (method === "merindilogun") {
    const shells = Array.from({ length: 16 }, () => Math.round(Math.random()));
    const openCount = shells.filter(s => s === 1).length;
    selectedOdu = ODUS_MEJI[openCount % ODUS_MEJI.length];
    resultDetails = { shells, openCount, name: "Merindilogun (16 Búzios)" };
  } else {
    selectedOdu = ODUS_MEJI[Math.floor(Math.random() * ODUS_MEJI.length)];
    resultDetails = { palmNuts: 16, name: "Ikin" };
  }

  const ai = getGemini();
  if (!ai) {
    return res.json({
      success: true, odu: selectedOdu, resultDetails,
      interpretation: `## ${selectedOdu.name}\n\nEquilíbrio e renovação.\n\n**Ebó:** Vela branca, água, flores.\n\n*Àṣẹ*`
    });
  }

  try {
    const prompt = `Consulente pergunta: "${question || "Conselho para o momento"}"
Método: ${resultDetails.name}
Odu: ${selectedOdu.name} (${selectedOdu.description})
Faça interpretação divinatória profunda. Estruture: 1. O Odu, 2. Resposta, 3. Ebó, 4. Àṣẹ.`;
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [{ text: prompt }],
      config: { systemInstruction: "Babaláwo sênior interpretando Ifá. Seja autêntico." }
    });
    res.json({ success: true, odu: selectedOdu, resultDetails, interpretation: response.text });
  } catch (error: any) {
    res.status(500).json({ error: "Erro: " + error.message });
  }
});

// ═══════════════════════════════════════
// STATIC / VITE
// ═══════════════════════════════════════

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
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`⚡ Ifá Oluwo rodando em http://localhost:${PORT}`);
  });
}

startServer();

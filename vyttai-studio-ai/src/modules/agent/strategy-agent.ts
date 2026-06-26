import { CampaignAgentContext, getBrainString } from "./agent-context.js";

export type StrategyPlan = {
  agent: "strategy";
  objective: string;
  audience: string;
  promise: string;
  angle: string;
  emotion: string;
  insight: string;
  objections: string[];
  contentStructure: string[];
};

export async function runStrategyAgent(context: CampaignAgentContext): Promise<StrategyPlan> {
  const positioning = getBrainString(
    context.brandBrain,
    "identity",
    "positioning",
    `Conteudo alinhado ao posicionamento da marca ${context.brand.name}.`,
  );

  const audience = getBrainString(
    context.brandBrain,
    "knowledge",
    "audience",
    "Publico definido pelo objetivo da campanha.",
  );

  const tone = getBrainString(context.brandBrain, "voice", "tone", "claro, consistente e comercial");

  return {
    agent: "strategy",
    objective: context.campaign.objective,
    audience,
    promise: positioning,
    angle: `Conectar o tema "${context.campaign.theme}" ao objetivo "${context.campaign.objective}".`,
    emotion: tone.includes("espiritual")
      ? "profundidade, respeito e autoridade"
      : tone.includes("cientifico")
        ? "confianca, precisao e descoberta"
        : tone.includes("sofisticado")
          ? "desejo, curadoria e exclusividade"
          : "clareza, confianca e acao",
    insight: `O publico precisa entender rapidamente por que "${context.campaign.theme}" e relevante agora e por que ${context.brand.name} e a fonte certa para guiar essa decisao.`,
    objections: [
      "Por que isso importa agora?",
      "Por que essa marca e confiavel?",
      "Qual e o proximo passo simples?",
    ],
    contentStructure: ["gancho", "contexto", "explicacao", "prova ou valor", "cta"],
  };
}

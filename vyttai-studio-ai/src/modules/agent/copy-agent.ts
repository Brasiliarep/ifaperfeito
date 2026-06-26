import { CampaignAgentContext, getBrainList, getBrainString } from "./agent-context.js";
import { CreativeSlideContract } from "../creative/creative-output-contract.js";
import { StrategyPlan } from "./strategy-agent.js";

export type CopyOutput = {
  agent: "copy";
  title: string;
  slides: Omit<CreativeSlideContract, "imagePrompt">[];
  caption: string;
  hashtags: string[];
  cta: string;
};

export async function runCopyAgent(
  context: CampaignAgentContext,
  strategy: StrategyPlan,
): Promise<CopyOutput> {
  const favoriteWords = getBrainList(context.brandBrain, "voice", "favoriteWords");
  const productName = context.products[0]?.name ?? getBrainString(context.brandBrain, "knowledge", "product", context.brand.name);
  const cta = buildCta(context.brand.name, context.campaign.objective);

  return {
    agent: "copy",
    title: context.campaign.theme,
    slides: [
      {
        number: 1,
        intent: "hook",
        role: "hook",
        headline: context.campaign.theme,
        body: `Uma abertura forte para prender atencao e posicionar ${context.brand.name} com autoridade.`,
        visualDirection: "Imagem principal forte, alto contraste e titulo dominante.",
        layoutHint: "bold",
      },
      {
        number: 2,
        intent: "context",
        role: "context",
        headline: "Por que isso importa?",
        body: strategy.angle,
        visualDirection: "Composicao explicativa com elementos de apoio da identidade visual.",
        layoutHint: "grid",
      },
      {
        number: 3,
        intent: "explanation",
        role: "education",
        headline: "O ponto central",
        body: `A mensagem deve educar sem perder o foco em ${strategy.objective}.`,
        visualDirection: "Hierarquia clara entre conceito principal e texto de apoio.",
        layoutHint: "centered",
      },
      {
        number: 4,
        intent: "proof",
        role: "value",
        headline: "O valor da marca",
        body: `${productName} entra como a ponte entre necessidade, confianca e decisao.`,
        visualDirection: "Elementos visuais que reforcem autoridade, produto e confianca.",
        layoutHint: "grid",
      },
      {
        number: 5,
        intent: "cta",
        role: "cta",
        headline: "Proximo passo",
        body: cta,
        visualDirection: "Fechamento limpo, direto, com CTA grande e marca em destaque.",
        layoutHint: "bold",
      },
    ],
    caption: `${context.campaign.theme}\n\n${strategy.promise}\n\n${cta}`,
    hashtags: buildHashtags(context.brand.slug, favoriteWords),
    cta,
  };
}

function buildCta(brandName: string, objective: string) {
  if (objective.toLowerCase().includes("assin")) {
    return `Conheca a assinatura ${brandName}.`;
  }

  if (objective.toLowerCase().includes("vender")) {
    return "Fale agora e veja a melhor opcao disponivel.";
  }

  return "Saiba mais e avance para o proximo passo.";
}

function buildHashtags(slug: string, favoriteWords: string[]) {
  const brandTag = `#${slug.replace(/-/g, "")}`;
  const wordTags = favoriteWords.slice(0, 4).map((word) => `#${word.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "")}`);

  return [brandTag, ...wordTags];
}

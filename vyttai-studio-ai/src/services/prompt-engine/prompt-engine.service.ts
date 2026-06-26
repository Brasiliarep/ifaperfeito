import { CampaignAgentContext, getBrainList, getBrainString } from "../../modules/agent/agent-context.js";
import { CreativeSlideContract } from "../../modules/creative/creative-output-contract.js";
import { StrategyPlan } from "../../modules/agent/strategy-agent.js";

export type VisualPromptOutput = {
  purpose: "carousel_visual";
  prompt: string;
  negativePrompt: string;
  slidePrompts: Array<{
    number: number;
    prompt: string;
  }>;
};

export async function generateCarouselVisualPrompt(
  context: CampaignAgentContext,
  strategy: StrategyPlan,
  slides: Array<Omit<CreativeSlideContract, "imagePrompt">>,
): Promise<VisualPromptOutput> {
  const colors = getBrainList(context.brandBrain, "visual", "colors").join(", ");
  const style = getBrainString(context.brandBrain, "visual", "style", "premium branded editorial design");
  const symbols = getBrainList(context.brandBrain, "visual", "symbols").join(", ");
  const tone = getBrainString(context.brandBrain, "voice", "tone", "clear, premium, trustworthy");

  return {
    purpose: "carousel_visual",
    prompt: [
      `Create a premium Instagram carousel for ${context.brand.name}.`,
      `Theme: ${context.campaign.theme}.`,
      `Objective: ${strategy.objective}.`,
      `Visual style: ${style}.`,
      colors ? `Color palette: ${colors}.` : "",
      symbols ? `Use brand-related visual elements: ${symbols}.` : "",
      `Tone: ${tone}.`,
      "Strong typographic hierarchy, readable mobile-first layout, polished composition, brand-consistent spacing, export-ready social media design.",
    ]
      .filter(Boolean)
      .join(" "),
    negativePrompt:
      "Avoid generic stock look, cluttered text, low contrast, off-brand colors, distorted typography, unreadable small text, and mixed brand identities.",
    slidePrompts: slides.map((slide) => ({
      number: slide.number,
      prompt: [
        `Slide ${slide.number} for ${context.brand.name} Instagram carousel.`,
        `Intent: ${slide.intent}.`,
        `Headline: ${slide.headline}.`,
        `Visual direction: ${slide.visualDirection}.`,
        `Brand style: ${style}.`,
        colors ? `Palette: ${colors}.` : "",
        symbols ? `Relevant symbols: ${symbols}.` : "",
        `Layout system: ${slide.layoutHint}.`,
        `Emotional direction: ${strategy.emotion}.`,
      ]
        .filter(Boolean)
        .join(" "),
    })),
  };
}

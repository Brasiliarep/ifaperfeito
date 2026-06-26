import { prisma } from "../database/prisma.js";
import { CampaignAgentContext, getBrainList, getBrainString } from "../../modules/agent/agent-context.js";
import { runCopyAgent } from "../../modules/agent/copy-agent.js";
import { runStrategyAgent } from "../../modules/agent/strategy-agent.js";
import {
  CarouselCreativeOutputContract,
  CreativeComplianceContract,
  CreativeDesignContract,
  LayoutSystem,
} from "../../modules/creative/creative-output-contract.js";
import { createMemoryEvent } from "../../modules/memory/memory.service.js";
import {
  createOrchestratorRun,
  OrchestratorDecisionTrace,
  OrchestratorStepTrace,
} from "../../modules/observability/observability.service.js";
import { generateCarouselVisualPrompt } from "../../services/prompt-engine/prompt-engine.service.js";

type RunCampaignInput = {
  campaignId: string;
};

export async function runCampaignOrchestrator(input: RunCampaignInput) {
  const startedAt = new Date();
  const steps: OrchestratorStepTrace[] = [];
  const decisions: OrchestratorDecisionTrace[] = [];
  let jobId: string | undefined;
  let outputId: string | undefined;

  const campaign = await prisma.campaign.findUnique({
    where: { id: input.campaignId },
    include: {
      brand: {
        include: {
          brain: true,
          products: true,
        },
      },
    },
  });

  if (!campaign) {
    throw new Error("Campaign not found.");
  }

  try {
    const brandBrain = campaign.brand.brain;
    const context = await traceStep(steps, "brand_brain_query", "Carregou marca, produtos e Brand Brain.", async () => {
      const agentContext: CampaignAgentContext = {
        brand: {
          id: campaign.brand.id,
          name: campaign.brand.name,
          slug: campaign.brand.slug,
          description: campaign.brand.description,
        },
        campaign: {
          id: campaign.id,
          name: campaign.name,
          objective: campaign.objective,
          theme: campaign.theme,
          mode: campaign.mode,
        },
        brandBrain: brandBrain
          ? {
              identity: brandBrain.identity as Record<string, unknown>,
              voice: brandBrain.voice as Record<string, unknown>,
              visual: brandBrain.visual as Record<string, unknown>,
              rules: brandBrain.rules as Record<string, unknown>,
              knowledge: brandBrain.knowledge as Record<string, unknown>,
            }
          : null,
        products: campaign.brand.products.map((product) => ({
          id: product.id,
          name: product.name,
          description: product.description,
          audience: product.audience,
        })),
      };

      decisions.push(
        {
          key: "brand",
          value: agentContext.brand.slug,
          reason: "A marca selecionada define tom, visual, compliance e conhecimento usado na geracao.",
        },
        {
          key: "hasBrandBrain",
          value: Boolean(agentContext.brandBrain),
          reason: "O Brand Brain e a principal fonte de contexto antes de qualquer criacao.",
        },
      );

      return agentContext;
    });

    const strategy = await traceStep(steps, "strategy_agent", "Definiu objetivo, audiencia, angulo, emocao e insight.", () =>
      runStrategyAgent(context),
    );

    decisions.push(
      {
        key: "emotion",
        value: strategy.emotion,
        reason: "A emocao e inferida pelo tom de voz da marca no Brand Brain.",
      },
      {
        key: "contentStructure",
        value: strategy.contentStructure,
        reason: "A estrutura vira os intents dos slides render-ready.",
      },
    );

    const copy = await traceStep(steps, "copy_agent", "Criou slides, legenda, CTA e hashtags.", () =>
      runCopyAgent(context, strategy),
    );

    decisions.push({
      key: "slideCount",
      value: copy.slides.length,
      reason: "O MVP usa um carrossel compacto de cinco slides para validar consistencia de output.",
    });

    const visualPrompt = await traceStep(steps, "prompt_engine", "Gerou prompt visual geral e prompts por slide.", () =>
      generateCarouselVisualPrompt(context, strategy, copy.slides),
    );

    const outputContract = await traceStep(
      steps,
      "creative_contract_assembly",
      "Montou o contrato creative-output.v1.1 render-ready.",
      async () => {
        const contract: CarouselCreativeOutputContract = {
          schemaVersion: "creative-output.v1.1",
          type: "carousel",
          brand: {
            id: context.brand.id,
            name: context.brand.name,
            slug: context.brand.slug,
          },
          campaign: {
            id: context.campaign.id,
            name: context.campaign.name,
            objective: context.campaign.objective,
            theme: context.campaign.theme,
            mode: context.campaign.mode,
          },
          strategy: {
            objective: strategy.objective,
            audience: strategy.audience,
            promise: strategy.promise,
            angle: strategy.angle,
            emotion: strategy.emotion,
            insight: strategy.insight,
            objections: strategy.objections,
          },
          creative: {
            title: copy.title,
            slides: copy.slides.map((slide) => ({
              ...slide,
              imagePrompt:
                visualPrompt.slidePrompts.find((slidePrompt) => slidePrompt.number === slide.number)?.prompt ??
                visualPrompt.prompt,
            })),
            caption: copy.caption,
            hashtags: copy.hashtags,
            cta: copy.cta,
          },
          design: buildDesignContract(context),
          compliance: buildComplianceContract(context),
          metadata: {
            orchestratorVersion: "campaign-orchestrator.v1.1",
            generatedAt: new Date().toISOString(),
            agentTrace: steps.map((step) => step.name),
            renderReady: true,
          },
        };

        decisions.push({
          key: "layoutSystem",
          value: contract.design.layoutSystem,
          reason: "O layoutSystem e inferido do estilo visual da marca para orientar o renderizador futuro.",
        });

        return contract;
      },
    );

    const job = await prisma.creativeJob.create({
      data: {
        brandId: campaign.brandId,
        campaignId: campaign.id,
        type: "carousel",
        objective: campaign.objective,
        theme: campaign.theme,
        briefing: {
          mode: campaign.mode,
          brand: campaign.brand.name,
          brandBrain: brandBrain
            ? {
                identity: brandBrain.identity,
                voice: brandBrain.voice,
                visual: brandBrain.visual,
                rules: brandBrain.rules,
                knowledge: brandBrain.knowledge,
              }
            : null,
        },
        status: "running",
      },
    });
    jobId = job.id;

    await prisma.promptGeneration.create({
      data: {
        brandId: campaign.brandId,
        purpose: visualPrompt.purpose,
        input: {
          campaignId: campaign.id,
          theme: campaign.theme,
          objective: campaign.objective,
        },
        prompt: visualPrompt.prompt,
      },
    });

    const output = await prisma.creativeOutput.create({
      data: {
        jobId: job.id,
        format: "carousel_text",
        status: "draft",
        content: outputContract,
      },
    });
    outputId = output.id;

    await prisma.creativeVersion.create({
      data: {
        outputId: output.id,
        version: 1,
        content: output.content,
        notes: "Initial Campaign Orchestrator MVP output.",
      },
    });

    await createMemoryEvent({
      brandId: campaign.brandId,
      outputId: output.id,
      eventType: "generation",
      payload: {
        campaignId: campaign.id,
        jobId: job.id,
        format: output.format,
        schemaVersion: outputContract.schemaVersion,
        orchestratorVersion: outputContract.metadata.orchestratorVersion,
        slideCount: outputContract.creative.slides.length,
        renderReady: outputContract.metadata.renderReady,
      },
    });

    await prisma.creativeJob.update({
      where: { id: job.id },
      data: { status: "completed" },
    });

    await prisma.campaign.update({
      where: { id: campaign.id },
      data: { status: "completed" },
    });

    const orchestratorRun = await createOrchestratorRun({
      campaignId: campaign.id,
      brandId: campaign.brandId,
      jobId,
      outputId,
      status: "completed",
      steps,
      decisions,
      startedAt,
      finishedAt: new Date(),
    });

    return {
      campaign,
      job,
      output,
      orchestratorRun,
    };
  } catch (error) {
    await createOrchestratorRun({
      campaignId: campaign.id,
      brandId: campaign.brandId,
      jobId,
      outputId,
      status: "failed",
      steps,
      decisions,
      error: error instanceof Error ? error.message : "Unknown orchestrator error.",
      startedAt,
      finishedAt: new Date(),
    });

    throw error;
  }
}

async function traceStep<T>(
  steps: OrchestratorStepTrace[],
  name: string,
  summary: string,
  action: () => Promise<T> | T,
) {
  const stepStartedAt = Date.now();

  try {
    const result = await action();
    steps.push({
      name,
      status: "completed",
      durationMs: Date.now() - stepStartedAt,
      summary,
    });
    return result;
  } catch (error) {
    steps.push({
      name,
      status: "failed",
      durationMs: Date.now() - stepStartedAt,
      summary: error instanceof Error ? error.message : `Failed at ${name}.`,
    });
    throw error;
  }
}

function buildDesignContract(context: CampaignAgentContext): CreativeDesignContract {
  const palette = getBrainList(context.brandBrain, "visual", "colors");
  const symbols = getBrainList(context.brandBrain, "visual", "symbols");
  const style = getBrainString(context.brandBrain, "visual", "style", "premium branded editorial design");

  return {
    palette,
    style,
    typographyMood: inferTypographyMood(context),
    symbols,
    layoutSystem: inferLayoutSystem(style),
  };
}

function buildComplianceContract(context: CampaignAgentContext): CreativeComplianceContract {
  const compliance = getBrainString(context.brandBrain, "rules", "compliance", "");
  const warnings = compliance ? [compliance] : [];
  const requiredDisclaimers: string[] = [];

  if (context.brand.slug === "sf-imports") {
    requiredDisclaimers.push("Venda proibida para menores de 18 anos.");
  }

  if (["sf-performance", "peptium", "vyttai"].includes(context.brand.slug)) {
    requiredDisclaimers.push("Conteudo informativo. Nao substitui orientacao profissional.");
  }

  return {
    warnings,
    requiredDisclaimers,
  };
}

function inferTypographyMood(context: CampaignAgentContext) {
  const tone = getBrainString(context.brandBrain, "voice", "tone", "");

  if (tone.includes("espiritual")) {
    return "serif premium, solemn, high contrast titles";
  }

  if (tone.includes("cientifico") || tone.includes("tecnico")) {
    return "bold condensed sans, technical labels, data-driven hierarchy";
  }

  if (tone.includes("sofisticado")) {
    return "elegant serif, refined spacing, premium catalog feel";
  }

  return "clean sans, strong hierarchy, mobile-first readability";
}

function inferLayoutSystem(style: string): LayoutSystem {
  const normalizedStyle = style.toLowerCase();

  if (normalizedStyle.includes("cinematografico") || normalizedStyle.includes("sagrado")) {
    return "cinematic";
  }

  if (normalizedStyle.includes("catalogo") || normalizedStyle.includes("preco")) {
    return "catalog";
  }

  if (normalizedStyle.includes("compar")) {
    return "comparison";
  }

  if (normalizedStyle.includes("infografico") || normalizedStyle.includes("cientifico")) {
    return "grid";
  }

  return "bold";
}

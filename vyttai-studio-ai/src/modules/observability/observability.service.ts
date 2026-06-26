import { prisma } from "../../core/database/prisma.js";

export type OrchestratorStepTrace = {
  name: string;
  status: "completed" | "failed";
  durationMs: number;
  summary: string;
};

export type OrchestratorDecisionTrace = {
  key: string;
  value: string | number | boolean | string[] | null;
  reason: string;
};

export type CreateOrchestratorRunInput = {
  campaignId: string;
  brandId: string;
  jobId?: string;
  outputId?: string;
  status: "completed" | "failed";
  steps: OrchestratorStepTrace[];
  decisions: OrchestratorDecisionTrace[];
  error?: string;
  startedAt: Date;
  finishedAt: Date;
};

export async function createOrchestratorRun(input: CreateOrchestratorRunInput) {
  return prisma.orchestratorRun.create({
    data: {
      campaignId: input.campaignId,
      brandId: input.brandId,
      jobId: input.jobId,
      outputId: input.outputId,
      status: input.status,
      steps: input.steps,
      decisions: input.decisions,
      error: input.error,
      startedAt: input.startedAt,
      finishedAt: input.finishedAt,
      durationMs: input.finishedAt.getTime() - input.startedAt.getTime(),
    },
  });
}

export async function listCampaignRuns(campaignId: string) {
  return prisma.orchestratorRun.findMany({
    where: { campaignId },
    orderBy: { createdAt: "desc" },
  });
}

export async function getOutputRun(outputId: string) {
  return prisma.orchestratorRun.findFirst({
    where: { outputId },
    orderBy: { createdAt: "desc" },
  });
}

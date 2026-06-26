import { prisma } from "../../core/database/prisma.js";
import { OrchestratorStepTrace } from "../observability/observability.service.js";

export async function getBrandInsights(brandId: string) {
  const [brand, runs, outputs, memoryEvents] = await Promise.all([
    prisma.brand.findUnique({
      where: { id: brandId },
      select: {
        id: true,
        name: true,
        slug: true,
      },
    }),
    prisma.orchestratorRun.findMany({
      where: { brandId },
      orderBy: { createdAt: "desc" },
      take: 100,
    }),
    prisma.creativeOutput.findMany({
      where: {
        job: {
          brandId,
        },
      },
      select: {
        id: true,
        status: true,
        format: true,
        approvals: {
          select: {
            status: true,
            createdAt: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 100,
    }),
    prisma.creativeMemoryEvent.findMany({
      where: { brandId },
      orderBy: { createdAt: "desc" },
      take: 100,
    }),
  ]);

  const completedRuns = runs.filter((run) => run.status === "completed");
  const failedRuns = runs.filter((run) => run.status === "failed");
  const approvedOutputs = outputs.filter((output) => output.status === "approved");
  const rejectedOutputs = outputs.filter((output) => output.status === "rejected");
  const inReviewOutputs = outputs.filter((output) => output.status === "in_review");
  const approvalEvents = memoryEvents.filter((event) => event.eventType === "approval");
  const qualityScores = approvalEvents
    .map((event) => getPayloadNumber(event.payload, "qualityScore"))
    .filter((score): score is number => typeof score === "number");

  return {
    brand,
    summary: {
      runs: runs.length,
      completedRuns: completedRuns.length,
      failedRuns: failedRuns.length,
      outputs: outputs.length,
      approvedOutputs: approvedOutputs.length,
      rejectedOutputs: rejectedOutputs.length,
      inReviewOutputs: inReviewOutputs.length,
      approvalRate: outputs.length > 0 ? round((approvedOutputs.length / outputs.length) * 100) : 0,
      averageRunMs: average(completedRuns.map((run) => run.durationMs ?? 0)),
      averageQualityScore: average(qualityScores),
      memoryEvents: memoryEvents.length,
    },
    stepPerformance: buildStepPerformance(runs),
    memoryBreakdown: buildEventBreakdown(memoryEvents.map((event) => event.eventType)),
    recentSignals: memoryEvents.slice(0, 8).map((event) => ({
      id: event.id,
      eventType: event.eventType,
      outputId: event.outputId,
      createdAt: event.createdAt,
      qualityScore: getPayloadNumber(event.payload, "qualityScore"),
      schemaVersion: getPayloadString(event.payload, "schemaVersion") ?? getPayloadString(event.payload, "contentSchemaVersion"),
    })),
  };
}

function buildStepPerformance(runs: Array<{ steps: unknown }>) {
  const accumulator = new Map<string, { count: number; totalMs: number; failures: number }>();

  for (const run of runs) {
    const steps = Array.isArray(run.steps) ? (run.steps as OrchestratorStepTrace[]) : [];

    for (const step of steps) {
      const current = accumulator.get(step.name) ?? { count: 0, totalMs: 0, failures: 0 };
      current.count += 1;
      current.totalMs += step.durationMs;
      current.failures += step.status === "failed" ? 1 : 0;
      accumulator.set(step.name, current);
    }
  }

  return [...accumulator.entries()]
    .map(([name, value]) => ({
      name,
      count: value.count,
      averageMs: round(value.totalMs / value.count),
      failures: value.failures,
    }))
    .sort((a, b) => b.averageMs - a.averageMs);
}

function buildEventBreakdown(events: string[]) {
  return events.reduce<Record<string, number>>((breakdown, eventType) => {
    breakdown[eventType] = (breakdown[eventType] ?? 0) + 1;
    return breakdown;
  }, {});
}

function average(values: number[]) {
  if (values.length === 0) {
    return 0;
  }

  return round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

function round(value: number) {
  return Math.round(value * 100) / 100;
}

function getPayloadNumber(payload: unknown, key: string) {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const value = (payload as Record<string, unknown>)[key];
  return typeof value === "number" ? value : null;
}

function getPayloadString(payload: unknown, key: string) {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const value = (payload as Record<string, unknown>)[key];
  return typeof value === "string" ? value : null;
}

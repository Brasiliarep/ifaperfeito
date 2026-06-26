import { prisma } from "../../core/database/prisma.js";

export type CreateMemoryEventInput = {
  brandId: string;
  outputId?: string;
  eventType: "generation" | "approval" | "rejection" | "needs_changes" | "edit" | "manual_note";
  payload: Record<string, unknown>;
};

export async function createMemoryEvent(input: CreateMemoryEventInput) {
  return prisma.creativeMemoryEvent.create({
    data: {
      brandId: input.brandId,
      outputId: input.outputId,
      eventType: input.eventType,
      payload: input.payload,
    },
  });
}

export async function listBrandMemoryEvents(brandId: string) {
  return prisma.creativeMemoryEvent.findMany({
    where: { brandId },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
}

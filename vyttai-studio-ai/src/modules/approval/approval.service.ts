import { prisma } from "../../core/database/prisma.js";
import { createMemoryEvent } from "../memory/memory.service.js";

export type SubmitApprovalInput = {
  outputId: string;
  userId: string;
  status: "approved" | "rejected" | "needs_changes";
  feedback?: string;
  qualityScore?: number;
  whatChanged?: string;
};

export async function submitApproval(input: SubmitApprovalInput) {
  const output = await prisma.creativeOutput.findUnique({
    where: { id: input.outputId },
    include: {
      job: true,
    },
  });

  if (!output) {
    throw new Error("Creative output not found.");
  }

  const outputStatus = mapApprovalStatusToOutputStatus(input.status);

  const [approval, updatedOutput] = await prisma.$transaction([
    prisma.approval.create({
      data: {
        outputId: input.outputId,
        userId: input.userId,
        status: input.status,
        comment: input.feedback,
      },
    }),
    prisma.creativeOutput.update({
      where: { id: input.outputId },
      data: { status: outputStatus },
    }),
  ]);

  const event = await createMemoryEvent({
    brandId: output.job.brandId,
    outputId: output.id,
    eventType: input.status === "approved" ? "approval" : input.status === "rejected" ? "rejection" : "needs_changes",
    payload: {
      approvalId: approval.id,
      status: input.status,
      outputStatus,
      feedback: input.feedback ?? null,
      qualityScore: input.qualityScore ?? null,
      whatChanged: input.whatChanged ?? null,
      format: output.format,
      contentSchemaVersion: getContentSchemaVersion(output.content),
    },
  });

  return {
    approval,
    output: updatedOutput,
    memoryEvent: event,
  };
}

function mapApprovalStatusToOutputStatus(status: SubmitApprovalInput["status"]) {
  if (status === "approved") {
    return "approved";
  }

  if (status === "rejected") {
    return "rejected";
  }

  return "in_review";
}

function getContentSchemaVersion(content: unknown) {
  if (content && typeof content === "object" && "schemaVersion" in content) {
    const schemaVersion = (content as { schemaVersion?: unknown }).schemaVersion;
    return typeof schemaVersion === "string" ? schemaVersion : null;
  }

  return null;
}

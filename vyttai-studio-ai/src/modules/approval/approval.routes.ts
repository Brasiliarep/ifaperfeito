import { Router } from "express";
import { z } from "zod";

import { submitApproval } from "./approval.service.js";

export const approvalRoutes = Router();

const submitApprovalSchema = z.object({
  outputId: z.string().min(1),
  userId: z.string().min(1),
  status: z.enum(["approved", "rejected", "needs_changes"]),
  feedback: z.string().optional(),
  qualityScore: z.number().int().min(0).max(10).optional(),
  whatChanged: z.string().optional(),
});

approvalRoutes.post("/", async (req, res, next) => {
  try {
    const payload = submitApprovalSchema.parse(req.body);
    const result = await submitApproval(payload);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

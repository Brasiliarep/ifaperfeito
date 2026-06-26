import { Router } from "express";
import { z } from "zod";

import { prisma } from "../../core/database/prisma.js";
import { runCampaignOrchestrator } from "../../core/orchestrator/campaign-orchestrator.js";

export const campaignRoutes = Router();

const createCampaignSchema = z.object({
  brandId: z.string().min(1),
  userId: z.string().min(1),
  name: z.string().min(1),
  objective: z.string().min(1),
  theme: z.string().min(1),
  mode: z.enum(["creator", "marketing_director"]).default("creator"),
});

campaignRoutes.post("/", async (req, res, next) => {
  try {
    const payload = createCampaignSchema.parse(req.body);

    const campaign = await prisma.campaign.create({
      data: payload,
    });

    res.status(201).json({ campaign });
  } catch (error) {
    next(error);
  }
});

campaignRoutes.post("/:id/run", async (req, res, next) => {
  try {
    const result = await runCampaignOrchestrator({
      campaignId: req.params.id,
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
});

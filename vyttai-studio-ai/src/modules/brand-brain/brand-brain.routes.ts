import { Router } from "express";
import { z } from "zod";

import { prisma } from "../../core/database/prisma.js";

export const brandBrainRoutes = Router();

const upsertBrandBrainSchema = z.object({
  brandId: z.string().min(1),
  identity: z.record(z.string(), z.unknown()).default({}),
  voice: z.record(z.string(), z.unknown()).default({}),
  visual: z.record(z.string(), z.unknown()).default({}),
  rules: z.record(z.string(), z.unknown()).default({}),
  knowledge: z.record(z.string(), z.unknown()).default({}),
});

brandBrainRoutes.put("/:brandId", async (req, res, next) => {
  try {
    const payload = upsertBrandBrainSchema.parse({
      ...req.body,
      brandId: req.params.brandId,
    });

    const brain = await prisma.brandBrain.upsert({
      where: { brandId: payload.brandId },
      create: payload,
      update: {
        identity: payload.identity,
        voice: payload.voice,
        visual: payload.visual,
        rules: payload.rules,
        knowledge: payload.knowledge,
      },
    });

    res.json({ brain });
  } catch (error) {
    next(error);
  }
});

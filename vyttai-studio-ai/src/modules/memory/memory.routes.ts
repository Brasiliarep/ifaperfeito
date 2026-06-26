import { Router } from "express";
import { z } from "zod";

import { createMemoryEvent, listBrandMemoryEvents } from "./memory.service.js";

export const memoryRoutes = Router();

const createMemoryEventSchema = z.object({
  brandId: z.string().min(1),
  outputId: z.string().min(1).optional(),
  eventType: z.enum(["generation", "approval", "rejection", "needs_changes", "edit", "manual_note"]),
  payload: z.record(z.string(), z.unknown()).default({}),
});

memoryRoutes.post("/events", async (req, res, next) => {
  try {
    const payload = createMemoryEventSchema.parse(req.body);
    const event = await createMemoryEvent(payload);

    res.status(201).json({ event });
  } catch (error) {
    next(error);
  }
});

memoryRoutes.get("/brand/:brandId/events", async (req, res, next) => {
  try {
    const events = await listBrandMemoryEvents(req.params.brandId);

    res.json({ events });
  } catch (error) {
    next(error);
  }
});

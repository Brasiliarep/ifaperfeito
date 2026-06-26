import { Router } from "express";

import { getBrandInsights } from "./insights.service.js";

export const insightsRoutes = Router();

insightsRoutes.get("/brand/:brandId", async (req, res, next) => {
  try {
    const insights = await getBrandInsights(req.params.brandId);

    res.json({ insights });
  } catch (error) {
    next(error);
  }
});

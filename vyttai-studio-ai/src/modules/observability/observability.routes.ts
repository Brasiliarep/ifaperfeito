import { Router } from "express";

import { getOutputRun, listCampaignRuns } from "./observability.service.js";

export const observabilityRoutes = Router();

observabilityRoutes.get("/campaign/:campaignId/runs", async (req, res, next) => {
  try {
    const runs = await listCampaignRuns(req.params.campaignId);

    res.json({ runs });
  } catch (error) {
    next(error);
  }
});

observabilityRoutes.get("/output/:outputId/run", async (req, res, next) => {
  try {
    const run = await getOutputRun(req.params.outputId);

    res.json({ run });
  } catch (error) {
    next(error);
  }
});

import cors from "cors";
import express from "express";
import path from "node:path";

import { approvalRoutes } from "./modules/approval/approval.routes.js";
import { brandBrainRoutes } from "./modules/brand-brain/brand-brain.routes.js";
import { brandRoutes } from "./modules/brand/brand.routes.js";
import { campaignRoutes } from "./modules/campaign/campaign.routes.js";
import { insightsRoutes } from "./modules/insights/insights.routes.js";
import { memoryRoutes } from "./modules/memory/memory.routes.js";
import { observabilityRoutes } from "./modules/observability/observability.routes.js";
import { workspaceRoutes } from "./modules/workspace/workspace.routes.js";
import { errorHandler } from "./middlewares/error-handler.js";

const app = express();
const publicPath = path.resolve(process.cwd(), "public");

app.use(cors());
app.use(express.json({ limit: "2mb" }));
app.use(express.static(publicPath));

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    system: "VYTTAI STUDIO AI",
    architecture: "modular-monolith",
  });
});

app.use("/workspace", workspaceRoutes);
app.use("/brands", brandRoutes);
app.use("/brand-brains", brandBrainRoutes);
app.use("/campaigns", campaignRoutes);
app.use("/approvals", approvalRoutes);
app.use("/memory", memoryRoutes);
app.use("/observability", observabilityRoutes);
app.use("/insights", insightsRoutes);

app.use(errorHandler);

export default app;

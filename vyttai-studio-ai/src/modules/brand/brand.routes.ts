import { Router } from "express";

import { prisma } from "../../core/database/prisma.js";

export const brandRoutes = Router();

brandRoutes.get("/", async (_req, res, next) => {
  try {
    const brands = await prisma.brand.findMany({
      orderBy: { name: "asc" },
    });

    res.json({ brands });
  } catch (error) {
    next(error);
  }
});

brandRoutes.get("/:id", async (req, res, next) => {
  try {
    const brand = await prisma.brand.findUnique({
      where: { id: req.params.id },
      include: {
        brain: true,
        products: true,
      },
    });

    if (!brand) {
      res.status(404).json({ error: "brand_not_found" });
      return;
    }

    res.json({ brand });
  } catch (error) {
    next(error);
  }
});

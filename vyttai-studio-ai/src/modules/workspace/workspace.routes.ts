import { Router } from "express";

import { prisma } from "../../core/database/prisma.js";

export const workspaceRoutes = Router();

workspaceRoutes.get("/current", async (_req, res, next) => {
  try {
    const workspace = await prisma.workspace.findFirst({
      where: { slug: "sf-group" },
      include: {
        users: {
          select: {
            role: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        brands: {
          orderBy: { name: "asc" },
        },
      },
    });

    res.json({ workspace });
  } catch (error) {
    next(error);
  }
});

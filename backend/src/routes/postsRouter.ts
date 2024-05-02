import express from "express";
import authMiddleware from "../../middlewares/authMiddleware";
import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const router = Router();
const prisma = new PrismaClient();

router.get("/", authMiddleware, async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    const posts = await prisma.post.findMany({
      skip: offset,
      take: limit,
      orderBy: {
        id: "desc",
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            profilePic: true,
          },
        },
      },
    });
    const totalPosts = await prisma.post.count();
    const totalPages = Math.ceil(totalPosts / limit);
    const response = {
      posts,
      meta: {
        current_page: page,
        total_pages: totalPages,
        total_posts: totalPosts,
        next_page: page < totalPages ? page + 1 : null,
      },
    };
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;

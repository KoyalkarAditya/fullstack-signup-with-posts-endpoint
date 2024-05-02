"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authMiddleware_1 = __importDefault(require("../../middlewares/authMiddleware"));
const client_1 = require("@prisma/client");
const express_1 = require("express");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
router.get("/", authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    try {
        const posts = yield prisma.post.findMany({
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
        const totalPosts = yield prisma.post.count();
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
exports.default = router;

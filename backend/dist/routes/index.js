"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.rootRouter = express_1.default.Router();
const userRouter_1 = require("./userRouter");
const postsRouter_1 = require("./postsRouter");
exports.rootRouter.use("/user", userRouter_1.userRouter);
exports.rootRouter.use("posts", postsRouter_1.postRouter);

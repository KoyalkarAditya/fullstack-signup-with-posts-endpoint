import express from "express";
export const rootRouter = express.Router();
import { userRouter } from "./userRouter";
import { postRouter } from "./postsRouter";
rootRouter.use("/user", userRouter);
rootRouter.use("posts", postRouter);

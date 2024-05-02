import { Router } from "express";
const router = Router();
import userRouter from "./userRouter";
import postRouter from "./postsRouter";
router.get("/", (req, res) => {
  return res.json({
    msg: "Message ",
  });
});
router.use("/user", userRouter);
router.use("/posts", postRouter);

export default router;

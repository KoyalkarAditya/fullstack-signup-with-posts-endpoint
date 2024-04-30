import express from "express";
export const postRouter = express.Router();
postRouter.get("/", (req, res) => {
  return res.json({ msg: "hello i am user home" });
});

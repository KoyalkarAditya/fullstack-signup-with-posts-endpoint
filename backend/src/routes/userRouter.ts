import express from "express";
export const userRouter = express.Router();
import { signupSchema } from "../../types";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { JWT_SECRET } from "../../config";
import { signupLimiter } from "../../middlewares/signupLimiter";
const prisma = new PrismaClient();
userRouter.post("/signup", signupLimiter, async (req, res) => {
  const { success } = signupSchema.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      message: "Invalid credentials",
    });
  }
  const { email, name, password } = req.body;
  if (!success) {
    return res.status(411).json({
      message: "Invalid credentials",
    });
  }
  const userExits = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (userExits) {
    return res.status(411).json({
      message: "User already exists with the username or password",
    });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });
    const token = jwt.sign({ email: email }, JWT_SECRET);
    res.json({
      message: "User Created Successfully",
      token: token,
    });
  }
});

userRouter.post("/resetpassword", async (req, res) => {
  const { email, newPassword, password } = req.body;

  if (!email || !newPassword) {
    return res
      .status(400)
      .json({ message: "Email, new password are required" });
  }
  const { success } = signupSchema.safeParse({ email, password });
  if (!success) {
    return res.status(411).json({
      message: "Error while logging in / Incorrect inputs",
    });
  }
  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        const newHashedPassword = await bcrypt.hash(newPassword, 10);
        await prisma.user.update({
          where: {
            email,
          },
          data: {
            password: newHashedPassword,
          },
        });
        return res.json({
          message: "Password has been updated ",
        });
      } else {
        return res.status(411).json({
          message: "Wrong Password",
        });
      }
    }
  } catch (error) {
    console.error("password reset error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

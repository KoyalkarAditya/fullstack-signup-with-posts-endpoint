import express from "express";
import { Router } from "express";
import { signupSchema } from "../../types";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { JWT_SECRET } from "../../config";
import { signupLimiter } from "../../middlewares/signupLimiter";
import fs from "fs";
const prisma = new PrismaClient();
const router = Router();

router.use(
  express.urlencoded({ extended: true, limit: 1000, parameterLimit: 5 })
);
import multer from "multer";
import authMiddleware from "../../middlewares/authMiddleware";
const upload = multer({ dest: "uploads/" });

router.post("/signup", upload.single("profilePic"), async (req, res) => {
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  console.log("File:", req.file);
  const { success } = signupSchema.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      message: "Invalid credentials",
    });
  }

  const { email, name, password } = req.body;
  const profilePicFile = req.file;
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
    let profilePicData = null;
    if (profilePicFile) {
      profilePicData = fs.readFileSync(profilePicFile.path);
    }
    console.log("ProfilePicData", profilePicData);
    console.log("profilepic", profilePicFile);
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        profilePic: profilePicData,
      },
    });
    console.log(newUser);
    const token = jwt.sign({ email: email }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({
      message: "User Created Successfully",
      token: token,
    });
  }
});

router.post("/resetpassword", authMiddleware, async (req, res) => {
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

export default router;

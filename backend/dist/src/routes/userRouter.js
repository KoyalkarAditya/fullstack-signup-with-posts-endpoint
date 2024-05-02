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
const express_1 = __importDefault(require("express"));
const express_2 = require("express");
const types_1 = require("../../types");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../../config");
const fs_1 = __importDefault(require("fs"));
const prisma = new client_1.PrismaClient();
const router = (0, express_2.Router)();
router.use(express_1.default.urlencoded({ extended: true, limit: 1000, parameterLimit: 5 }));
const multer_1 = __importDefault(require("multer"));
const authMiddleware_1 = __importDefault(require("../../middlewares/authMiddleware"));
const upload = (0, multer_1.default)({ dest: "uploads/" });
router.post("/signup", upload.single("profilePic"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);
    console.log("File:", req.file);
    const { success } = types_1.signupSchema.safeParse(req.body);
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
    const userExits = yield prisma.user.findFirst({
        where: {
            email,
        },
    });
    if (userExits) {
        return res.status(411).json({
            message: "User already exists with the username or password",
        });
    }
    else {
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        let profilePicData = null;
        if (profilePicFile) {
            profilePicData = fs_1.default.readFileSync(profilePicFile.path);
        }
        console.log("ProfilePicData", profilePicData);
        console.log("profilepic", profilePicFile);
        const newUser = yield prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                profilePic: profilePicData,
            },
        });
        console.log(newUser);
        const token = jsonwebtoken_1.default.sign({ email: email }, config_1.JWT_SECRET, {
            expiresIn: "1h",
        });
        res.status(200).json({
            message: "User Created Successfully",
            token: token,
        });
    }
}));
router.post("/resetpassword", authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { newPassword, password } = req.body;
    const email = req.email;
    if (!email || !newPassword) {
        return res
            .status(400)
            .json({ message: "Email, new password are required" });
    }
    const { success } = types_1.signupSchema.safeParse({ email, password });
    if (!success) {
        return res.status(411).json({
            message: "Error while logging in / Incorrect inputs",
        });
    }
    try {
        const user = yield prisma.user.findFirst({
            where: {
                email,
            },
        });
        if (user) {
            const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
            if (isPasswordValid) {
                const newHashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
                yield prisma.user.update({
                    where: {
                        email,
                    },
                    data: {
                        password: newHashedPassword,
                    },
                });
                return res.status(200).json({
                    message: "Password has been updated ",
                });
            }
            else {
                return res.status(411).json({
                    message: "Wrong Password",
                });
            }
        }
    }
    catch (error) {
        console.error("password reset error:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}));
exports.default = router;

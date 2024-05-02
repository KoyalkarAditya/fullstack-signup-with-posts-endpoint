"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const userRouter_1 = __importDefault(require("./userRouter"));
const postsRouter_1 = __importDefault(require("./postsRouter"));
router.get("/", (req, res) => {
    return res.json({
        msg: "Message ",
    });
});
router.use("/user", userRouter_1.default);
router.use("/posts", postsRouter_1.default);
exports.default = router;

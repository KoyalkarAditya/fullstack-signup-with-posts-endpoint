"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.postRouter = express_1.default.Router();
exports.postRouter.get("/", (req, res) => {
    return res.json({ msg: "hello i am user home" });
});

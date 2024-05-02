"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signupSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    name: zod_1.default.string().min(6).max(15).optional(),
    password: zod_1.default.string().min(6).max(20),
    profilePic: zod_1.default.instanceof(File).optional(),
});

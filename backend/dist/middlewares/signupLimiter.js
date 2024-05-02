"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
exports.signupLimiter = (0, express_rate_limit_1.default)({
    windowMs: 5 * 60 * 1000,
    max: 5,
    message: "Too many requests, please try again after 5 minutes",
    standardHeaders: true,
    legacyHeaders: false,
});

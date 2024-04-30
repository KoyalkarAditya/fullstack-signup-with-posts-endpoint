import rateLimit from "express-rate-limit";
export const signupLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 3,
  message: "Too many requests, please try again after 5 minutes",
  standardHeaders: true,
  legacyHeaders: false,
});

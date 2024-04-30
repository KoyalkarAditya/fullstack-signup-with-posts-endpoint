import zod from "zod";
export const signupSchema = zod.object({
  email: zod.string().email(),
  name: zod.string().min(6).max(15).optional(),
  password: zod.string().min(6).max(20),
});

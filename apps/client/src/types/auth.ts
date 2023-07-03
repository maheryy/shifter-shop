import isStrongPassword from "validator/es/lib/isStrongPassword";
import { z } from "zod";
import User from "./user";

export const Register = z.object({
  email: z.string().email(),
  firstname: z.string(),
  lastname: z.string(),
  password: z.string().refine(isStrongPassword, {
    message:
      "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number and one symbol",
  }),
});

export const Login = z.object({
  email: z.string().email(),
  password: z.string(),
});

const Auth = z.object({
  token: z.string(),
  user: User,
});

export type TRegister = z.infer<typeof Register>;
export type TLogin = z.infer<typeof Login>;
export type Auth = z.infer<typeof Auth>;

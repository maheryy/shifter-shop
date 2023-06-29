import isStrongPassword from "validator/es/lib/isStrongPassword";
import { z } from "zod";
import User from "./user";

const Register = z.object({
  email: z.string().email(),
  firstname: z.string(),
  lastname: z.string(),
  password: z.string().refine(isStrongPassword, {
    message:
      "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number and one symbol",
  }),
});

const Login = z.object({
  email: z.string().email(),
  password: z.string(),
});

const Auth = z.object({
  token: z.string(),
  user: User,
});

export type Register = z.infer<typeof Register>;
export type Login = z.infer<typeof Login>;
export type Auth = z.infer<typeof Auth>;

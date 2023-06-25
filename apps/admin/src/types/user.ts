import { z } from "zod";

export const UserRoles = z.enum(["admin"]);

const User = z.object({
  id: z.number(),
  firstname: z.string(),
  lastname: z.string(),
  email: z.string().email(),
  phone: z.string(),
  role: UserRoles,
});

const UpdateUser = User.omit({ id: true, role: true }).partial();

const UpdatePassword = z.object({
  password: z.string(),
});

const UpdatePasswordWithToken = UpdatePassword.extend({
  token: z.string(),
});

export type User = z.infer<typeof User>;
export type UpdateUser = z.infer<typeof UpdateUser>;
export type UpdatePassword = z.infer<typeof UpdatePassword>;
export type UpdatePasswordWithToken = z.infer<typeof UpdatePassword>;

export default User;

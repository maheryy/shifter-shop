import { z } from "zod";

export const roles = ["CUSTOMER", "SELLER"] as const;

export const UserRoles = z.enum(roles);

const User = z.object({
  id: z.string().uuid(),
  firstname: z.string().nonempty(),
  lastname: z.string().nonempty(),
  email: z.string().email(),
  role: UserRoles,
});

const UpdateUser = User.pick({ firstname: true, lastname: true }).partial();

const UpdatePassword = z.object({
  password: z.string(),
});

const UpdatePasswordWithToken = UpdatePassword.extend({
  token: z.string(),
});

export type TUserRoles = z.infer<typeof UserRoles>;
export type User = z.infer<typeof User>;
export type UpdateUser = z.infer<typeof UpdateUser>;
export type UpdatePassword = z.infer<typeof UpdatePassword>;
export type UpdatePasswordWithToken = z.infer<typeof UpdatePassword>;

export default User;

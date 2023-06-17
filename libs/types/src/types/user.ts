import { GlobalStatus } from "./status";

export interface User {
  id: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  role: UserRole;
  status: GlobalStatus;
}

export type UserWithoutPassword = Omit<User, "password">;

export enum UserRole {
  Admin = "ADMIN",
  Customer = "CUSTOMER",
  Seller = "SELLER",
}

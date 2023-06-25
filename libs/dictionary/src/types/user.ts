import { EGlobalStatus } from "./status";

export interface TUser {
  id: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  role: EUserRole;
  status: EGlobalStatus;
}

export type TUserWithoutPassword = Omit<TUser, "password">;

export enum EUserRole {
  Admin = "ADMIN",
  Customer = "CUSTOMER",
  Seller = "SELLER",
}

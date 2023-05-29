import { User } from "@/types/user";
import user from "@data/user.json";

export const getUser = async (token: string): Promise<User> => {
  const res = user;
  return res;
};

export const getAuthToken = async (
  email: string,
  password: string
): Promise<string> => {
  const token = "token";
  return token;
};

type UserUpdate = Pick<User, "firstname" | "lastname" | "phone">;

export function updateUser(user: UserUpdate) {
  return Promise.reject(new Error("Not implemented"));
}

export function updatePassword(password: string) {
  return Promise.reject(new Error("Not implemented"));
}

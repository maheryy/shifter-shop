import { User } from "../types/user";
import user from "../../data/user.json";

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

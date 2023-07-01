import { Token } from "@/types/token";
import { TUser } from "@shifter-shop/dictionary";
import api from ".";

export const getAllCustomers = async (): Promise<TUser[]> => {
  return api.get("/users?type=customer").json();
};

export const getAllSellers = async (): Promise<TUser[]> => {
  return api.get("/users?type=seller").json();
};

export const getAllAdmins = async (): Promise<TUser[]> => {
  return api.get("/users?type=admin").json();
};

export const getUser = async (token: string): Promise<TUser> => {
  return api.auth(`Bearer ${token}`).get("/auth/profile").json();
};

export const getAuthToken = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<Token> => {
  return api.post({ email, password }, "/auth/login").json();
};

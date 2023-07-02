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

export const getCountCustomers = async (): Promise<number> => {
  return api.get("/users/count?type=customer").json();
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

export const checkUserRole = async (): Promise<string | null> => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const user: TUser = await getUser(token);
      return user.role; // Assuming the user's role is stored in the 'role' property
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

import { Token } from "@/types/token";
import {
  UpdatePassword,
  UpdatePasswordWithToken,
  UpdateUser,
  User,
} from "@/types/user";
import api from ".";

export const getUser = async (token: string): Promise<User> => {
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

export function updateUser(user: UpdateUser) {
  return api.patch(user, "/user").json();
}

export function updatePassword(payload: UpdatePassword) {
  return api.patch(payload, "/user/password").json();
}

export function updatePasswordWithToken(payload: UpdatePasswordWithToken) {
  return api.patch(payload, "/user/password/token").json();
}

export function hasAccount(email: string): Promise<boolean> {
  return api.query({ email }).get("/auth/has-account").json();
}

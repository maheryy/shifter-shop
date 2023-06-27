import { Token } from "@/types/token";
import {
  UpdatePassword,
  UpdatePasswordWithToken,
  UpdateUser,
  User,
} from "@/types/user";
import api from ".";

export async function getUser(token: string): Promise<User> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return await res.json();
}

export const getAuthToken = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<Token> => {
  return fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then((res) => res.json());
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

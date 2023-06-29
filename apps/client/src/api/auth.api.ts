import api from "@/api";
import { Auth, Login, Register } from "@/types/auth";
import { User } from "@/types/user";

export function register(payload: Register): Promise<Auth> {
  return api.post(payload, "/auth/register").json();
}

export function login(payload: Login): Promise<Auth> {
  return api.post(payload, "/auth/login").json();
}

export function profile(): Promise<User> {
  return api.get("/auth/profile").json();
}

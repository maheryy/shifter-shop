import api from "@/api";
import { Auth, Register, TLogin, TRegister } from "@/types/auth";
import { User } from "@/types/user";

export function register(payload: TRegister): Promise<Auth> {
  return api.post(Register.parse(payload), "/auth/register").json();
}

export function login(payload: TLogin): Promise<Auth> {
  return api.post(payload, "/auth/login").json();
}

export function profile(): Promise<User> {
  return api.get("/auth/profile").json();
}

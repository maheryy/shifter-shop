import {
  UpdatePassword,
  UpdatePasswordWithToken,
  UpdateUser,
  User,
} from "@/types/user";
import api from ".";

export function getUser(token: string): Promise<User> {
  return api.query({ token }).get("/user").json();
}

export function updateUser({ firstname, lastname }: UpdateUser) {
  return api.patch({ firstname, lastname }, "/users").json();
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

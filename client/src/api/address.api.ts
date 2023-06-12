import { User } from "@/types/user";
import api from ".";

export function getUserAdresses(
  userId: User["id"],
): Promise<User["addresses"]> {
  return api.get(`/users/${userId}/addresses`).json();
}

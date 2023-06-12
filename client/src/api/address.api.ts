import { User } from "@/types/user";
import api from ".";

export function getAdresses(): Promise<User["addresses"]> {
  return api.get("/addresses").json();
}

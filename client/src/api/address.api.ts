import { Address, CreateAddress } from "@/types/address";
import { User } from "@/types/user";
import api from ".";

export function getAdresses(): Promise<User["addresses"]> {
  return api.get("/addresses").json();
}

export function createAddress(address: CreateAddress): Promise<Address> {
  return api.post(address, "/addresses").json();
}

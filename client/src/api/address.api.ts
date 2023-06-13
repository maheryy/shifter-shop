import { Address, CreateAddress } from "@/types/address";
import { User } from "@/types/user";
import api from ".";

export function getAdresses(): Promise<User["addresses"]> {
  return api.get("/addresses").json();
}

export function createAddress(address: CreateAddress): Promise<Address> {
  return api.post(address, "/addresses").json();
}

export function setDefaultAddress(addressId: Address["id"]): Promise<Address> {
  return api.patch(addressId, `/addresses/${addressId}/set-default`).json();
}

export function deleteAddress(addressId: Address["id"]): Promise<Address> {
  return api.delete(`/addresses/${addressId}`).json();
}

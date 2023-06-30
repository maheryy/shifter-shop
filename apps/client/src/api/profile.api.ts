import api from "@/api";
import { Address, CreateAddress, UpdateAddress } from "@/types/address";

export function getCustomerProfile() {
  return api.get("/profile/customer").json();
}

export function getAddresses(): Promise<Address[]> {
  return api.get("/profile/addresses").json();
}

export function createAddresses(address: CreateAddress): Promise<Address> {
  return api.post(address, "/profile/addresses").json();
}

export function updateAddresses(
  addressId: Address["id"],
  address: UpdateAddress,
): Promise<Address> {
  return api.patch(address, `/profile/addresses/${addressId}`).json();
}

export function deleteAddresses(addressId: Address["id"]) {
  return api.delete(`/profile/addresses/${addressId}`).json();
}

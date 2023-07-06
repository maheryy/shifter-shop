import api from "@/api";
import {
  CreateAddress,
  TAddress,
  TCreateAddress,
  TUpdateAddress,
  UpdateAddress,
} from "@/types/address";
import { TCreateBusinessRequest } from "@/types/business-request";

export function getCustomerProfile() {
  return api.get("/profile/customer").json();
}

export function getAddresses(): Promise<TAddress[]> {
  return api.get("/profile/addresses").json();
}

export function getAddress(addressId: TAddress["id"]): Promise<TAddress> {
  return api.get(`/profile/addresses/${addressId}`).json();
}

export function createAddress(address: TCreateAddress): Promise<TAddress> {
  const payload = CreateAddress.parse(address);

  return api.post(payload, "/profile/addresses").json();
}

export function updateAddress({
  addressId,
  address,
}: {
  addressId: TAddress["id"];
  address: TUpdateAddress;
}): Promise<TAddress> {
  const payload = UpdateAddress.parse(address);

  return api.patch(payload, `/profile/addresses/${addressId}`).json();
}

export function deleteAddress(addressId: TAddress["id"]): Promise<TAddress> {
  return api.delete(`/profile/addresses/${addressId}`).res();
}

export function setDefaultAddress(addressId: TAddress["id"]) {
  return api.url(`/profile/addresses/set-default/${addressId}`).post().res();
}

export function createBusinessRequest(payload: TCreateBusinessRequest) {
  return api.post(payload, "/profile/business/register").json();
}

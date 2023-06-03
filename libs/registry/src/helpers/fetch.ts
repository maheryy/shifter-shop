import { Registry } from "../lib/registry";
import { Services } from "../types/service";

interface Target {
  service: Services;
  endpoint: string;
}

export const fetchService = (target: Target, fetchOptions?: RequestInit) => {
  const baseUrl = Registry.get(target.service).url;
  return fetch(
    `${baseUrl}/${target.endpoint.replace(/^\//, "")}`,
    fetchOptions
  );
};

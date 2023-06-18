import { Registry } from "../lib/registry";
import { Services } from "../types/service";
import fetch, { RequestInit } from "node-fetch";

interface Target {
  service: Services;
  endpoint: string;
}

export const fetchService = (target: Target, fetchOptions?: RequestInit) => {
  const baseUrl = Registry.get(target.service).url;
  const endpoint = target.endpoint.replace(/^\//, "");
  return fetch(`${baseUrl}/${endpoint}`, fetchOptions);
};
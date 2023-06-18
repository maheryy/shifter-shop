import { Registry } from "../lib/registry";
import { Services } from "../types/service";
import fetch, { RequestInit } from "node-fetch";
import { HttpError } from "@shifter-shop/errors";

interface Target {
  service: Services;
  endpoint: string;
}

interface ExtendedRequestInit extends RequestInit {
  data?: Record<string, unknown>;
}

export const fetchService = async (
  target: Target,
  fetchOptions?: ExtendedRequestInit
) => {
  const baseUrl = Registry.get(target.service).url;
  const endpoint = target.endpoint.replace(/^\//, "");
  return fetch(`${baseUrl}/${endpoint}`, {
    ...fetchOptions,
    headers: {
      "app-id": "ss7",
      ...fetchOptions?.headers,
      ...(fetchOptions?.data ? { "Content-Type": "application/json" } : {}),
    },
    ...(fetchOptions?.data ? { body: JSON.stringify(fetchOptions.data) } : {}),
  });
};

export const fetchJson = async <T>(
  target: Target,
  fetchOptions?: ExtendedRequestInit
): Promise<T> => {
  const res = await fetchService(target, fetchOptions);
  const data = await res.json();

  if (!res.ok) {
    throw new HttpError(data.statusCode, data.message);
  }

  return data as T;
};

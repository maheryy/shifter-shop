import fetch, { RequestInit } from "node-fetch";
import { HttpError } from "@shifter-shop/errors";
import { Services, Registry } from "@shifter-shop/registry";

const APP_ID = "ss7";

export const fetchService = async (
  target: Target,
  fetchOptions?: ExtendedRequestInit
) => {
  const baseUrl = Registry.get(target.service).url;
  const endpoint = target.endpoint.replace(/^\//, "");
  return fetch(`${baseUrl}/${endpoint}`, {
    ...fetchOptions,
    headers: {
      "app-id": APP_ID,
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

interface Target {
  service: Services;
  endpoint: string;
}

interface ExtendedRequestInit extends RequestInit {
  data?: Record<string, unknown>;
}

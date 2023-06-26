import fetch, { RequestInit } from "node-fetch";
import { HttpError, ServiceUnavailableError } from "@shifter-shop/errors";
import { Registry } from "@shifter-shop/registry";
import { UService } from "@shifter-shop/dictionary";

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
  try {
    const res = await fetchService(target, fetchOptions);
    const data = await res.json();

    if (!res.ok) {
      throw new HttpError(data.statusCode, data.message);
    }

    return data as T;
  } catch (err) {
    if (err instanceof HttpError) throw err;
    console.error(`\x1b[31m[${target.service}] Communication error\x1b[0m`);
    throw new ServiceUnavailableError(
      `[${target.service}] Communication error`
    );
  }
};

interface Target {
  service: UService;
  endpoint: string;
}

interface ExtendedRequestInit extends RequestInit {
  data?: Record<string, unknown>;
}

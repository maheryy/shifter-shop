import wretch, { ConfiguredMiddleware } from "wretch";
import queryString from "wretch/addons/queryString";
import StorageKey from "@/types/storage";
import { getFromLocalStorage } from "@/utils/storage";

const authenticationMiddleware: ConfiguredMiddleware =
  (next) => (url, options) => {
    const token = getFromLocalStorage<string>(StorageKey.enum.token);

    if (token) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    return next(url, options);
  };

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const api = wretch(baseURL)
  .addon(queryString)
  .middlewares([authenticationMiddleware]);

export default api;

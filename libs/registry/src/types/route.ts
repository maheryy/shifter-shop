export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface Route {
  path: string;
  method: HttpMethod;
  middlewares?: string[];
}

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface Route {
  path: string;
  method: HttpMethod;
  private?: boolean;
  middlewares?: string[];
  roles?: string[];
}

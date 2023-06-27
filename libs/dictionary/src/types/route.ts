export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface TRoute {
  path: string;
  method: HttpMethod;
  private?: boolean;
  middlewares?: string[];
  roles?: string[];
}

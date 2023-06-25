import { TRegistryEnvMap } from "./registry";
import { TRoute } from "./route";

export enum EService {
  Files = "files",
  Mailer = "mailer",
  Auth = "auth",
  User = "user",
  Invoice = "invoice",
  Order = "order",
  Payment = "payment",
  Product = "product",
  Cart = "cart",
  Category = "category",
  Review = "review",
  Analytics = "analytics",
}

export type UService = `${EService}`;

export interface TServiceConfig extends TRegistryEnvMap {
  name: EService;
  path?: string;
  private?: boolean;
  routes?: TRoute[];
}

export interface TServiceEnvConfig {
  url: string;
}

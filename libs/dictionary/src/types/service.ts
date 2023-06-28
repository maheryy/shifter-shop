import { TRegistryEnvMap } from "./registry";
import { TRoute } from "./route";

export enum EService {
  Files = "files",
  Mailer = "mailer",
  Auth = "auth",
  User = "user",
  Profile = "profile",
  Invoice = "invoice",
  Order = "order",
  Payment = "payment",
  Product = "product",
  Cart = "cart",
  Category = "category",
  Review = "review",
  Inventory = "inventory",
  Search = "search",
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

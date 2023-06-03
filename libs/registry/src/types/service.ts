import { RegistryEnvMap } from "./registry";

export enum ServiceType {
  Files = "files",
  Mailer = "mailer",
  // Auth = "auth",
  // User = "user",
  Invoice = "invoice",
  Order = "order",
  Payment = "payment",
  // Product = "product",
  Cart = "cart",
  // Category = "category",
  // Review = "review",
  Analytics = "analytics",
}

export type Services = `${ServiceType}`;

export interface ServiceConfig extends RegistryEnvMap {
  name: ServiceType;
}

export interface ServiceEnvConfig {
  url: string;
}

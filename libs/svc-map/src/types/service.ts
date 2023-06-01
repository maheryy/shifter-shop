export enum ServiceType {
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

export type ServiceEnv = "production" | "development" | "local" | "test";

export interface ServiceOptions {
  env?: ServiceEnv;
}

export interface DynamicServiceConfig {
  url: string;
}

export interface ServiceConfig extends ServiceConfigEnvMap {
  name: ServiceType;
}

type ServiceConfigEnvMap = {
  [key in ServiceEnv]: DynamicServiceConfig;
};

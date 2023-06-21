import { ServiceEnvConfig } from "./service";

export type RegistryEnv = "production" | "development" | "local" | "test";

export interface RegistryOptions {
  env?: RegistryEnv;
}

export type RegistryEnvMap = {
  [key in RegistryEnv]: ServiceEnvConfig;
};

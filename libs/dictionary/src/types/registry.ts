import { TServiceEnvConfig } from "./service";

export type TRegistryEnv = "production" | "development" | "local" | "test";

export interface TRegistryOptions {
  env?: TRegistryEnv;
}

export type TRegistryEnvMap = {
  [key in TRegistryEnv]: TServiceEnvConfig;
};

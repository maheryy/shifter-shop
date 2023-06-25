import { getAllConfig } from "../utils/parser";
import {
  TServiceConfig,
  EService,
  UService,
  TRegistryEnv,
  TRegistryOptions,
} from "@shifter-shop/dictionary";

export class Registry {
  private static services: TServiceConfig[] = [];
  private serviceConfig: TServiceConfig;
  private envKey: TRegistryEnv = "development";

  private constructor(serviceConfig: TServiceConfig, options?: TRegistryOptions) {
    this.serviceConfig = serviceConfig;

    if (options?.env) {
      this.envKey = options.env;
    }
  }

  public static get(name: UService, options?: TRegistryOptions): Registry {
    if (!Object.values(EService).includes(name as EService)) {
      throw new Error(
        `Unkown service ${name}: must be one of ${Object.values(
          EService
        ).join(", ")}`
      );
    }

    const config = this.getConfig(name);
    if (!config) {
      throw new Error(`Service ${name} not found`);
    }

    if (process.env.NODE_ENV === "production" && !options?.env) {
      options = { ...options, env: "production" };
    }

    return new Registry(config, options);
  }

  public static getServices(): TServiceConfig[] {
    if (!this.services.length) {
      this.services = getAllConfig();
    }

    return this.services;
  }

  private static getConfig(name: UService) {
    if (!this.services.length) {
      this.services = getAllConfig();
    }

    return this.services.find((service) => service.name === name);
  }

  public get config(): TServiceConfig {
    return this.serviceConfig;
  }

  public get url(): string {
    return this.serviceConfig[this.envKey].url;
  }

  public get name(): string {
    return this.serviceConfig.name;
  }
}

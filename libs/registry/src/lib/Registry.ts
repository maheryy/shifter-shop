import { getAllConfig } from "../utils/parser";
import { ServiceConfig, ServiceType, Services } from "../types/service";
import { RegistryEnv, RegistryOptions } from "types/registry";

export class Registry {
  private static services: ServiceConfig[] = [];
  private serviceConfig: ServiceConfig;
  private envKey: RegistryEnv = "development";

  private constructor(serviceConfig: ServiceConfig, options?: RegistryOptions) {
    this.serviceConfig = serviceConfig;

    if (options?.env) {
      this.envKey = options.env;
    }
  }

  public static get(name: Services, options?: RegistryOptions): Registry {
    if (!Object.values(ServiceType).includes(name as ServiceType)) {
      throw new Error(
        `Unkown service ${name}: must be one of ${Object.values(
          ServiceType
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

  public static getServices(): ServiceConfig[] {
    if (!this.services.length) {
      this.services = getAllConfig();
    }

    return this.services;
  }

  private static getConfig(name: Services) {
    if (!this.services.length) {
      this.services = getAllConfig();
    }

    return this.services.find((service) => service.name === name);
  }

  public get config(): ServiceConfig {
    return this.serviceConfig;
  }

  public get url(): string {
    return this.serviceConfig[this.envKey].url;
  }

  public get name(): string {
    return this.serviceConfig.name;
  }
}

import { getServiceConfig } from "../utils/parser";
import {
  ServiceConfig,
  ServiceEnv,
  ServiceOptions,
  ServiceType,
} from "../types/service";

export class Service {
  private serviceConfig: ServiceConfig;
  private envKey: ServiceEnv = "development";

  private constructor(serviceConfig: ServiceConfig, options?: ServiceOptions) {
    this.serviceConfig = serviceConfig;

    if (options?.env) {
      this.envKey = options.env;
    }
  }

  public static get(name: ServiceType, options?: ServiceOptions): Service {
    if (!Object.values(ServiceType).includes(name)) {
      throw new Error(
        `Unkown service ${name}: must be one of ${Object.values(
          ServiceType
        ).join(", ")}`
      );
    }

    if (process.env.NODE_ENV === "production" && !options?.env) {
      options = { ...options, env: "production" };
    }

    const serviceConfig = getServiceConfig(name);
    return new Service(serviceConfig, options);
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

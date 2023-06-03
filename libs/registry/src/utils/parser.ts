import { ServiceConfig, ServiceType } from "../types/service";

export const getServiceConfig = (service: ServiceType): ServiceConfig => {
  try {
    const config = require(`../../services/${service}.json`) as ServiceConfig;
    return config;
  } catch (err) {
    console.error((err as Error).message);
    throw new Error(`Service ${service} not found`);
  }
};

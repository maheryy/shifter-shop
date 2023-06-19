import { ServiceConfig, ServiceType, Services } from "../types/service";
import { join } from "path";
import { readdirSync } from "fs";

const servicesPath = join(__dirname, "../../services");

export const getServiceConfig = (service: Services): ServiceConfig => {
  try {
    return require(join(servicesPath, `${service}.json`)) as ServiceConfig;
  } catch (err) {
    console.error((err as Error).message);
    throw new Error(`Service ${service} not found`);
  }
};

export const getAllConfig = (): ServiceConfig[] => {
  try {
    return readdirSync(servicesPath).map(
      (service) => require(join(servicesPath, service)) as ServiceConfig
    );
  } catch (err) {
    console.error((err as Error).message);
    throw new Error(`Unable to load services config`);
  }
};

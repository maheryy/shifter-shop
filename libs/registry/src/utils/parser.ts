import { join } from "path";
import { readdirSync } from "fs";
import { TServiceConfig, UService } from "@shifter-shop/dictionary";
import { logger } from "@shifter-shop/logger";

const servicesPath = join(__dirname, "../../services");

export const getServiceConfig = (service: UService): TServiceConfig => {
  try {
    return require(join(servicesPath, `${service}.json`)) as TServiceConfig;
  } catch (err) {
    logger.error(
      `[getServiceConfig] Service ${service} not found : ${
        (err as Error).message
      }`
    );
    throw new Error(`Service ${service} not found`);
  }
};

export const getAllConfig = (): TServiceConfig[] => {
  try {
    return readdirSync(servicesPath).map(
      (service) => require(join(servicesPath, service)) as TServiceConfig
    );
  } catch (err) {
    logger.error(
      `[getServiceConfig] Unable to load services config : ${
        (err as Error).message
      }`
    );
    throw new Error(`Unable to load services config`);
  }
};

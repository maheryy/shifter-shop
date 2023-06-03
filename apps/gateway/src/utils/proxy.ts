import { ServiceConfig } from "@shifter-shop/registry";
import { Express } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const NODE_ENV =
  process.env.NODE_ENV === "production" ? "production" : "development";

export const proxify = (app: Express, services: ServiceConfig[]) => {
  services.forEach((service) => {
    app.use(
      `/${service.name}`,
      createProxyMiddleware({
        target: service[NODE_ENV].url,
        headers: { "powered-by": "shifter-shop" },
        changeOrigin: true,
        pathRewrite: {
          [`^/${service.name}`]: "",
        },
      })
    );
  });
};

import { HttpMethod, ServiceConfig } from "@shifter-shop/registry";
import { Router } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { registerMiddlewares } from "./middleware";
import { buildPath, sanitize } from "./url";
import { context } from "middlewares/context";

const NODE_ENV =
  process.env.NODE_ENV === "production" ? "production" : "development";

export const registerRoutes = (services: ServiceConfig[]): Router => {
  const allowedMethods = ["get", "post", "put", "delete", "patch"];
  const router = Router();

  services
    .filter((service) => !service.private)
    .forEach((service) => {
      if (
        !service.routes ||
        !Array.isArray(service.routes) ||
        service.routes.length === 0
      ) {
        console.error(
          `\x1b[33m[${service.name}] No available routes found\x1b[0m`
        );
        return;
      }

      const servicePath = sanitize(service.path || service.name);
      const serviceProxy = createProxyMiddleware({
        target: service[NODE_ENV].url,
        headers: { "powered-by": "shifter-shop" },
        changeOrigin: true,
        logLevel: "silent",
        pathRewrite: { [`^/${servicePath}`]: "" },
      });

      // Define routes for each service and register their own middlewares
      service.routes
        .filter((route) => !route.private)
        .forEach((route) => {
          const method = route.method.toLowerCase() as Lowercase<HttpMethod>;
          if (!allowedMethods.includes(method)) {
            throw new Error(
              `Invalid method ${route.method} for route ${route.path}`
            );
          }

          const endpoint = "/" + buildPath(servicePath, route.path);
          const proxyEndpoint = buildPath(service[NODE_ENV].url, route.path);
          
          // Apply the context middleware so we can access the route object in the following middlewares
          const middlewares = Array.isArray(route.middlewares)
          ? [context(route), ...registerMiddlewares(route.middlewares)]
          : [];

          router[method](endpoint, ...middlewares, serviceProxy);

          console.info(
            `\x1b[36m[${
              service.name
            }] ${route.method.toUpperCase()} ${endpoint} -> ${proxyEndpoint} ${
              middlewares.length > 0
                ? `(${middlewares.length - 1} middlewares)`
                : ""
            }\x1b[0m`
          );
        });

      // TEST: register a single proxy for the entire service instead of registering the same one on each route
      // router.use(`/${service.name}`, serviceProxy);
    });

  return router;
};

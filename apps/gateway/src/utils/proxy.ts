import { HttpMethod, ServiceConfig } from "@shifter-shop/registry";
import { Router } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { registerMiddlewares } from "./middleware";
import { buildPath } from "./url";

const NODE_ENV =
  process.env.NODE_ENV === "production" ? "production" : "development";

export const registerRoutes = (services: ServiceConfig[]): Router => {
  const allowedMethods = ["get", "post", "put", "delete", "patch"];
  const router = Router();

  services.forEach((service) => {
    if (
      !service.routes ||
      !Array.isArray(service.routes) ||
      service.routes.length === 0
    ) {
      console.error(`[${service.name}] No available routes found`);
      return;
    }

    const serviceProxy = createProxyMiddleware({
      target: service[NODE_ENV].url,
      headers: { "powered-by": "shifter-shop" },
      changeOrigin: true,
      logLevel: "silent",
      pathRewrite: { [`^/${service.name}`]: "" },
    });

    // Define routes for each service and register their own middlewares
    service.routes.forEach((route) => {
      const method = route.method.toLowerCase() as Lowercase<HttpMethod>;
      if (!allowedMethods.includes(method)) {
        throw new Error(
          `Invalid method ${route.method} for route ${route.path}`
        );
      }

      const endpoint = "/" + buildPath(service.path, route.path);
      const proxyEndpoint = buildPath(service[NODE_ENV].url, route.path);
      const middlewares = Array.isArray(route.middlewares)
        ? registerMiddlewares(route.middlewares)
        : [];

      router[method](endpoint, ...middlewares, serviceProxy);

      console.info(
        `[${
          service.name
        }] ${route.method.toUpperCase()} ${endpoint} -> ${proxyEndpoint} ${
          middlewares.length > 0 ? `(${middlewares.length} middlewares)` : ""
        }`
      );
    });

    // TEST: register a single proxy for the entire service instead of registering the same one on each route
    // router.use(`/${service.name}`, serviceProxy);
  });

  return router;
};

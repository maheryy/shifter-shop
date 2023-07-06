import { Request, Response, Router } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { registerMiddlewares } from "./middleware";
import { buildPath, sanitize } from "./url";
import { context } from "middlewares/context";
import { HttpMethod, TServiceConfig } from "@shifter-shop/dictionary";
import { IncomingMessage } from "http";
import { logger } from "@shifter-shop/logger";

const NODE_ENV =
  process.env.NODE_ENV === "production" ? "production" : "development";

export const registerRoutes = (services: TServiceConfig[]): Router => {
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
        logger.warn(`[${service.name}] No available routes found`);
        return;
      }

      const servicePath = sanitize(service.path || service.name);
      const serviceProxy = proxify(service);

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

          logger.info(
            `[${
              service.name
            }] ${route.method.toUpperCase()} ${endpoint} -> ${proxyEndpoint} ${
              middlewares.length > 0
                ? `(${middlewares.length - 1} middlewares)`
                : ""
            }`
          );
        });
    });

  return router;
};

export const proxify = (service: TServiceConfig) => {
  const servicePath = sanitize(service.path || service.name);
  return createProxyMiddleware({
    target: service[NODE_ENV].url,
    pathRewrite: { [`^/${servicePath}`]: "" },
    changeOrigin: true,
    headers: { "powered-by": "shifter-shop" },
    logLevel: "silent",
    onError: onProxyError(service),
    // onProxyRes: onProxyResponse(service),
  });
};

const onProxyError =
  (service: TServiceConfig) => (err: Error, req: Request, res: Response) => {
    res.status(503).json({
      statusCode: 503,
      message: `Service ${service.name} is unavailable`,
    });
    logger.error(`Service ${service.name} is unavailable: ${err.message}`);
  };

const onProxyResponse =
  (service: TServiceConfig) =>
  (proxyRes: IncomingMessage, req: Request, res: Response) => {
    logger.info(
      `[${service.name}] ${req.method.toUpperCase()} ${req.originalUrl} -> ${
        proxyRes.statusCode
      }`
    );
  };

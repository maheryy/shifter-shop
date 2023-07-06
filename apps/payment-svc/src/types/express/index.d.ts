declare global {
  namespace Express {
    interface Request {
      rawBody?: Buffer;
    }
  }
}

declare module "http" {
  interface IncomingMessage {
    rawBody: any;
  }
}

export {};

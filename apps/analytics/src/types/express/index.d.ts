declare global {
  namespace Express {
    interface Request {
      sendEvent: (data: Record<string, unknown>) => void;
    }
  }
}

export {};

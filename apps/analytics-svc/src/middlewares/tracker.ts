import { NextFunction, Request, Response } from "express";

const tracker = (config: TrackerConfig) => {
  return (req: Request, res: Response, next: NextFunction) => {
    req.sendEvent = (data) => {
      console.log(data);
    };

    next();
  };
};

export interface TrackerConfig {
  APP_ID: string;
  APP_SECRET: string;
  label?: string;
}

export default tracker;

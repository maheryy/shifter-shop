import { TLogLevel } from "../types/log";
import { consoleFormat } from "../utils/format";
import winston from "winston";

type Whatever = string | number | object | boolean | null | undefined;

export class Logger {
  private logger: winston.Logger;

  constructor() {
    this.logger = this.createWinstonLogger();
  }

  get winston() {
    return this.logger;
  }

  log(level: TLogLevel, ...message: Whatever[]) {
    this.logger.log(level, this.buildMessage(...message));
    return this;
  }

  info(...message: Whatever[]) {
    this.logger.info(this.buildMessage(...message));
    console.log(...message);
    return this;
  }

  warn(...message: Whatever[]) {
    this.logger.warn(this.buildMessage(...message));
    console.log(...message);
    return this;
  }

  error(...message: Whatever[]) {
    this.logger.error(this.buildMessage(...message));
    console.log(...message);
    return this;
  }

  private createWinstonLogger() {
    const logger = winston.createLogger({
      transports: this.getLoggerTransports(),
    });

    return logger;
  }

  private getLoggerTransports(): winston.transport[] {
    const transports: winston.transport[] = [
      new winston.transports.File({
        level: "error",
        dirname: "../../logs",
        filename: "errors.log",
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json()
        ),
      }),
    ];

    // if (process.env.NODE_ENV !== "production") {
      transports.push(
        new winston.transports.Console({
          consoleWarnLevels: ["info", "warn", "error"],
          format: consoleFormat,
        })
      );
    // }

    return transports;
  }

  private buildMessage(...message: Whatever[]) {
    return message
      .map((m) => (typeof m === "object" ? JSON.stringify(m) : m))
      .join(" ");
  }
}

export const logger = new Logger();

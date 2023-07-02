export enum ELogLevel {
  Error = "error",
  Warn = "warn",
  Info = "info",
  Http = "http",
  Verbose = "verbose",
  Debug = "debug",
  Silly = "silly",
}

export enum ELogPriority {
  Emergency,
  Alert,
  Critical,
  Error,
  Warning,
  Notice,
  Info,
  Debug,
}

export type TLogLevel = `${ELogLevel}`;

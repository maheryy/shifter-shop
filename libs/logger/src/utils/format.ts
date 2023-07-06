import { format } from "winston";

export const consoleFormat = format.printf((log) => {
  const c = CONSOLE_COLORS[log.level as keyof typeof CONSOLE_COLORS] || "0m";
  return `\x1b[${c}${log.message}\x1b[0m`;
});

const CONSOLE_COLORS = {
  info: "36m",
  notice: "32m",
  warn: "33m",
  debug: "33m",
  emerg: "31m",
  alert: "31m",
  error: "31m",
  crit: "31m",
};

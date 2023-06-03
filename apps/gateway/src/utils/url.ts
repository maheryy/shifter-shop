export const sanitize = (url: string) =>
  url.replace(/^\//, "").replace(/\/$/, "");

export const buildPath = (...parts: string[]) =>
  parts
    .filter((part) => part !== "" && part !== "/")
    .map(sanitize)
    .join("/");

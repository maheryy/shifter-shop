import { NotFoundError } from "@shifter-shop/errors";
import { readFile } from "fs/promises";
import Handlebars from "handlebars";
import { resolve } from "path";

export const getHandlebarsHTML = async (
  filename: string,
  context?: Record<string, unknown>
): Promise<string> => {
  try {
    const template = await readFile(
      resolve(__dirname, "..", "assets/templates", `${filename}.hbs`),
      { encoding: "utf-8" }
    );

    return Handlebars.compile(template)(context);
  } catch (err) {
    console.error((err as Error).message);
    throw new NotFoundError("Template not found");
  }
};

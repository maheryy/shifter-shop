import { z } from "zod";

const Token = z.object({
  token: z.string(),
});

export type Token = z.infer<typeof Token>;

import { z } from "zod";

const QueryKey = z.enum(["cart"]);

export type QueryKey = z.infer<typeof QueryKey>;

export default QueryKey;

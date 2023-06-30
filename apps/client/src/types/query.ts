import { z } from "zod";

const QueryKey = z.enum([
  "user",
  "cart",
  "orders",
  "products",
  "categories",
  "reviews",
]);

export type QueryKey = z.infer<typeof QueryKey>;

export default QueryKey;

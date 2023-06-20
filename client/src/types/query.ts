import { z } from "zod";

const QueryKey = z.enum(["cart", "orders", "products", "categories"]);

export type QueryKey = z.infer<typeof QueryKey>;

export default QueryKey;

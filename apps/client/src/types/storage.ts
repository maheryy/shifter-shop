import { z } from "zod";

const StorageKey = z.enum(["cart", "token"]);

export type StorageKey = z.infer<typeof StorageKey>;

export default StorageKey;

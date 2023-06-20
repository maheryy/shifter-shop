import { z } from "zod";

const OrderProduct = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  image: z.string(),
  quantity: z.number(),
});

export type OrderProduct = z.infer<typeof OrderProduct>;

export default OrderProduct;

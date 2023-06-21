import { z } from "zod";
import CartProduct from "./cartProduct";

const OrderProduct = CartProduct;

export type OrderProduct = z.infer<typeof OrderProduct>;

export default OrderProduct;

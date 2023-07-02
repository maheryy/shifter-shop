import { z } from "zod";
import CartProduct from "./cartProduct";

const Cart = z.array(CartProduct);

export type TCart = z.infer<typeof Cart>;

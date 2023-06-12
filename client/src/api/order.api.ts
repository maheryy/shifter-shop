import orders from "@data/orders.json";
import products from "@data/products.json";
import { getShuffledProducts } from "@/api/product.api";
import { Order, OrderAndProduct } from "@/types/order";

export const getOrders = async (): Promise<Order[]> => {
  const res = orders as Order[];

  return res.map((order) => ({
    ...order,
    products: getShuffledProducts(Math.floor(Math.random() * 3) + 1).map(
      (product) => ({ ...product, quantity: 1 }),
    ),
  }));
};

export const getOrderAndProduct = async (
  orderId: number,
  productId: number,
): Promise<OrderAndProduct> => {
  const res = orders as Order[];

  const order = res.filter((order) => order.id === orderId);

  if (!order.length) {
    throw new Error("Order not found");
  }

  const product = products.filter((product) => product.id === productId);

  if (!product.length) {
    throw new Error("Product not found");
  }

  return { order: order[0], product: product[0] };
};

export function createOrder(cart: unknown) {
  console.log("Not implemented", cart);
}

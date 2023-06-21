import { CartItem } from "entities/cart.entity";

export const getCustomerCart = async (customerId: string) => {
  return CartItem.find({
    where: { customer: customerId },
  });
};

export const createOrUpdateItem = async (
  customerId: string,
  productId: string,
  quantity: number
) => {
  return CartItem.upsert(
    { customer: customerId, product: productId, quantity },
    { conflictPaths: ["customer", "product"] }
  );
};

export const deleteProduct = async (customerId: string, productId: string) => {
  return CartItem.delete({ customer: customerId, product: productId });
};

export const clearCart = async (customerId: string) => {
  return CartItem.delete({ customer: customerId });
};

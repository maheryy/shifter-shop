import { CartItem } from "entities/cart.entity";

export const getCustomerCart = async (customerId: string) => {
  return CartItem.find({
    where: { customerId },
  });
};

export const createOrUpdateItem = async (
  customerId: string,
  productId: string,
  quantity: number
) => {
  return CartItem.upsert(
    { customerId, productId, quantity },
    { conflictPaths: ["customerId", "productId"] }
  );
};

export const deleteProduct = async (customerId: string, productId: string) => {
  return CartItem.delete({ customerId, productId });
};

export const clearCart = async (customerId: string) => {
  return CartItem.delete({ customerId });
};

import { Order as OrderEntity } from "entities/order.entity";
import { Order, OrderCreationData, OrderUpdateData } from "types/order";

export const findAllOrders = async () => {
  return OrderEntity.find();
};

export const findOrder = async (id: string) => {
  return OrderEntity.findOneBy({ id });
};

export const findOrdersByCustomerId = async (customerId: string) => {
  return OrderEntity.findOneBy({ customer: customerId });
};

export const updateOrder = async (id: string, data: OrderUpdateData) => {
  return OrderEntity.update({ id }, { ...data });
};

export const createOrder = async (data: OrderCreationData) => {
  return OrderEntity.create({ ...data }).save();
};

export const generateOrderReference = async () => {
  const generateReference = (length: number) => {
    return Math.random()
      .toString(36)
      .substring(2, 2 + length)
      .toUpperCase();
  };

  let reference: string;
  let order: Order | null;

  do {
    reference = generateReference(10);
    order = await OrderEntity.findOneBy({ reference });
  } while (order);

  return reference;
};

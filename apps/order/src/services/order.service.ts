import { NotFoundError } from "@shifter-shop/errors";
import { TOrder } from "@shifter-shop/types";
import { Order as OrderEntity } from "entities/order.entity";
import { TOrderCreationData, TOrderUpdateData } from "types/order";

export const findAllOrders = async () => {
  return OrderEntity.find();
};

export const findOrder = async (id: string) => {
  const order = await OrderEntity.findOneBy({ id });

  if (!order) {
    throw new NotFoundError("Order not found");
  }

  return order;
};

export const findOrdersByCustomerId = async (customerId: string) => {
  return OrderEntity.findBy({ customerId });
};

export const updateOrder = async (id: string, data: TOrderUpdateData) => {
  const res = await OrderEntity.update({ id }, { ...data });

  if (!res.affected) {
    throw new NotFoundError("Order not found");
  }

  return res;
};

export const createOrder = async (data: TOrderCreationData) => {
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
  let order: TOrder | null;

  do {
    reference = generateReference(10);
    order = await OrderEntity.findOneBy({ reference });
  } while (order);

  return reference;
};

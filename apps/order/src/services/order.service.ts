import { NotFoundError } from "@shifter-shop/errors";
import {
  EService,
  TFullOrder,
  TOrder,
  TProduct,
  TUser,
} from "@shifter-shop/dictionary";
import { Order as OrderEntity } from "entities/order.entity";
import { TOrderCreationData, TOrderUpdateData } from "types/order";
import { fetchJson } from "@shifter-shop/helpers";
import { logger } from "@shifter-shop/logger";

export const findAllOrders = async () => {
  return OrderEntity.find();
};

export const findOrderById = async (orderId: string, userId: string) => {
  const order = await OrderEntity.findOneBy({
    id: orderId,
    customerId: userId,
  });

  if (!order) {
    throw new NotFoundError("Order not found");
  }

  return order;
};

export const findOrderByReference = async (reference: string) => {
  const order = await OrderEntity.findOneBy({ reference });

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

const fetchCustomer = async (customerId: string) => {
  try {
    const customer = await fetchJson<TUser>({
      service: EService.User,
      endpoint: `/${customerId}`,
    });
    return customer;
  } catch (error) {
    logger.warn(`Error while fetching customer`);
    return null;
  }
};

const fetchProduct = async (productId: string) => {
  try {
    const product = await fetchJson<TProduct>({
      service: EService.Product,
      endpoint: `/${productId}`,
    });
    return product;
  } catch (error) {
    logger.warn(`Error while fetching product`);
    return null;
  }
};

export const getFullOrders = async (
  orders: TOrder[]
): Promise<TFullOrder[]> => {
  return Promise.all(
    orders.map(async (order) => {
      const customer = await fetchCustomer(order.customerId);
      const productPromises = order.products.map(async (product) => {
        return {
          ...product,
          ...(await fetchProduct(product.id)),
        };
      });

      return {
        ...order,
        customer,
        products: await Promise.all(productPromises),
      } as unknown as TFullOrder;
    })
  );
};

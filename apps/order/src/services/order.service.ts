import { NotFoundError } from "@shifter-shop/errors";
import {
  EService,
  EOrderStatus,
  TFullOrder,
  TOrder,
  TProduct,
  TUser,
} from "@shifter-shop/dictionary";
import { Order as OrderEntity } from "entities/order.entity";
import { TOrderCreationData, TOrderUpdateData } from "types/order";
import { fetchJson } from "@shifter-shop/helpers";
import { logger } from "@shifter-shop/logger";
import { Between } from "typeorm/find-options/operator/Between";
import { In } from "typeorm/find-options/operator/In";

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

export const countOrders = async (status?: string) => {
  if (
    status &&
    !Object.values(EOrderStatus).includes(
      (status.charAt(0).toUpperCase() +
        status.slice(1).toLowerCase()) as EOrderStatus
    )
  ) {
    throw new Error("Invalid status");
  }

  const _status = status
    ? ((status?.charAt(0).toUpperCase() +
        status?.slice(1).toLowerCase()) as EOrderStatus)
    : undefined;

  return OrderEntity.count({
    where: {
      status: _status,
    },
  });
};

export const countConfirmedOrdersByMonths = async (nbMonths: number) => {
  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() );
  const startDate = new Date();
  startDate.setMonth(endDate.getMonth() - nbMonths);

  const where = {
    status: In([EOrderStatus.Confirmed, EOrderStatus.Delivered]),
    date: Between(startDate, endDate),
  };

  const result = await OrderEntity.createQueryBuilder()
    .select('DATE_TRUNC(\'month\', "date")', 'month')
    .addSelect('COUNT(*)', 'number')
    .where(where)
    .groupBy('month')
    .orderBy('month', 'DESC')
    .getRawMany();

  return result.map((item): { month: string; number: number } => {
    return {
      month: item.month,
      number: Number(item.number),
    };
  });
};

export const countTotalAmount = async () => {
  const orders = await OrderEntity.findBy({
    status: EOrderStatus.Confirmed || EOrderStatus.Delivered,
  });

  return orders.reduce((acc, order) => {
    return acc + order.amount;
  }
  , 0);
};

export const countTotalSoldProducts = async () => {
  const orders = await OrderEntity.findBy({
    status: EOrderStatus.Confirmed || EOrderStatus.Delivered,
  });

  return orders.reduce((acc, order) => {
    return acc + order.products.length;
  }
  , 0);
};

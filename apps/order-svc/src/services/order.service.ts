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
import { FindOperator } from "typeorm/find-options/FindOperator";

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

export const countConfirmedOrdersByMonths = async (month: number) => {
  const endDate = new Date();
  endDate.setUTCHours(0, 0, 0, 0);
  endDate.setUTCDate(1);
  endDate.setUTCMonth(endDate.getUTCMonth() + 1);
  endDate.setMonth(endDate.getMonth());

  const startDate = new Date();
  startDate.setUTCHours(0, 0, 0, 0);
  startDate.setUTCDate(1);
  startDate.setUTCMonth(endDate.getUTCMonth() - month);

  const where = {
    status: In([
      EOrderStatus.Confirmed,
      EOrderStatus.Shipping,
      EOrderStatus.Delivered,
    ]),
    date: Between(startDate, endDate),
  };

  const result = await OrderEntity.createQueryBuilder()
    .select("DATE_TRUNC('month', \"date\")", "month")
    .addSelect("COUNT(*)", "number")
    .where(where)
    .groupBy("month")
    .orderBy("month", "DESC")
    .getRawMany();

  return result.map((item): { month: string; number: number } => {
    return {
      month: item.month,
      number: Number(item.number),
    };
  });
};

export const countTotalAmount = async (month?: number) => {
  const where: {
    status: FindOperator<EOrderStatus>;
    date?: FindOperator<Date>;
  } = {
    status: In([
      EOrderStatus.Confirmed,
      EOrderStatus.Shipping,
      EOrderStatus.Delivered,
    ]),
  };

  if (month) {
    const endDate = new Date();
    endDate.setUTCHours(0, 0, 0, 0);
    endDate.setUTCDate(1);
    endDate.setUTCMonth(endDate.getUTCMonth() + 1);
    endDate.setMonth(endDate.getMonth());

    const startDate = new Date();
    startDate.setUTCHours(0, 0, 0, 0);
    startDate.setUTCDate(1);
    startDate.setUTCMonth(endDate.getUTCMonth() - month);

    where.date = Between(startDate, endDate);
  }

  const orders = await OrderEntity.find({ where });

  return orders.reduce((acc, order) => {
    return acc + order.amount;
  }, 0);
};

export const countTotalSoldProducts = async (month?: number) => {
  const where: {
    status: FindOperator<EOrderStatus>;
    date?: FindOperator<Date>;
  } = {
    status: In([
      EOrderStatus.Confirmed,
      EOrderStatus.Shipping,
      EOrderStatus.Delivered,
    ]),
  };

  if (month) {
    const endDate = new Date();
    endDate.setUTCHours(0, 0, 0, 0);
    endDate.setUTCDate(1);
    endDate.setUTCMonth(endDate.getUTCMonth() + 1);
    endDate.setMonth(endDate.getMonth());

    const startDate = new Date();
    startDate.setUTCHours(0, 0, 0, 0);
    startDate.setUTCDate(1);
    startDate.setUTCMonth(endDate.getUTCMonth() - month);

    where.date = Between(startDate, endDate);
  }

  const orders = await OrderEntity.find({ where });

  return orders.reduce((acc, order) => {
    return acc + order.products.length;
  }, 0);
};

export const getTopSellingProductsByLimit = async (
  limit: number,
  month?: number
) => {
  const where: {
    status: FindOperator<EOrderStatus>;
    date?: FindOperator<Date>;
  } = {
    status: In([
      EOrderStatus.Confirmed,
      EOrderStatus.Shipping,
      EOrderStatus.Delivered,
    ]),
  };

  if (month) {
    const endDate = new Date();
    endDate.setUTCHours(0, 0, 0, 0);
    endDate.setUTCDate(1);
    endDate.setUTCMonth(endDate.getUTCMonth() + 1);
    endDate.setMonth(endDate.getMonth());

    const startDate = new Date();
    startDate.setUTCHours(0, 0, 0, 0);
    startDate.setUTCDate(1);
    startDate.setUTCMonth(endDate.getUTCMonth() - month);

    where.date = Between(startDate, endDate);
  }

  const orders = await OrderEntity.find({ where });
  const fullOrders = await getFullOrders(orders);

  // Create a map to store the total sales for each product
  // The key is the product id and the value is a map of product name and sales count
  const productSalesMap = new Map<string, Map<string, number>>();

  // Iterate over each full order and update the sales count for each product assuming that each product has a unique name and id
  fullOrders.forEach((order) => {
    order.products.forEach((product) => {
      const productId = product.id;
      const productName = product.name;
      const quantity = product.quantity;

      if (productSalesMap.has(productId)) {
        const productMap = productSalesMap.get(productId)!;
        productMap.set(
          productName,
          quantity + (productMap.get(productName) || 0)
        );
      } else {
        const productMap = new Map<string, number>();
        productMap.set(productName, quantity);
        productSalesMap.set(productId, productMap);
      }
    });
  });

  // Sort the products based on sales count in descending order
  // The result is an array of tuples where the first element is the product id and the second element is the map of product name and sales count
  const sortedProducts = [...productSalesMap.entries()].sort((a, b) => {
    const aSales = [...a[1].values()].reduce((acc, value) => acc + value, 0);
    const bSales = [...b[1].values()].reduce((acc, value) => acc + value, 0);
    return bSales - aSales;
  });

  // Limit the result to the specified limit
  const limitedProducts = sortedProducts.slice(0, limit);

  // Create the result object
  const result = await Promise.all(
    limitedProducts.map(async (product) => {
      return {
        product: product[0],
        name: product[1].keys().next().value,
        sales: product[1].values().next().value,
      };
    })
  );

  return result;
};

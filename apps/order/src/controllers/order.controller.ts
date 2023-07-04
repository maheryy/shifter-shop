import { BadRequestError, UnauthorizedError } from "@shifter-shop/errors";
import { EOrderStatus, EUserRole } from "@shifter-shop/dictionary";
import { NextFunction, Request, Response } from "express";
import {
  findAllOrders,
  findOrdersByCustomerId,
  createOrder as create,
  updateOrder as update,
  generateOrderReference,
  getFullOrders,
  findOrderById,
  findOrderByReference,
  countOrders,
  countConfirmedOrdersByMonths,
  getTopSellingProductsByLimit,
  countTotalAmount,
  countTotalSoldProducts,
} from "services/order.service";
import { TOrderCreationData, TOrderUpdateData } from "types/order";

export const createOrder = async (
  data: Omit<TOrderCreationData, "reference">
) => {
  const orderData: TOrderCreationData = {
    address: data.address,
    customerId: data.customerId,
    reference: await generateOrderReference(),
    amount: data.amount,
    products: data.products,
    status: data.status || EOrderStatus.Pending,
  };

  return create(orderData);
};

export const updateOrder = async (id: string, data: TOrderUpdateData) => {
  if (!data.status) {
    throw new BadRequestError("You must provide a status");
  }
  if (!Object.values(EOrderStatus).includes(data.status)) {
    throw new BadRequestError(
      `Invalid status : must be one of '${Object.values(EOrderStatus).join(
        "', '"
      )}'`
    );
  }

  const result = await update(id, { status: data.status });
  return result;
};

// For testing purposes only
export const newOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await createOrder(req.body);
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

export const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.get("user-id");
    const role = req.get("user-role");
    if (!userId || !role) {
      throw new UnauthorizedError(
        "You must be authenticated to access this resource"
      );
    }

    const orders =
      role === EUserRole.Admin
        ? await findAllOrders()
        : await findOrdersByCustomerId(userId);

    const { month = 0 }: { month?: number } = req.query;
    const { top }: { top?: number } = req.query;

    if (month && isNaN(month)) {
      throw new BadRequestError("Month must be a number");
    } else if (top && isNaN(top)) {
      throw new BadRequestError("Top must be a number");
    } else if (top) {
      const topSellingProducts = await getTopSellingProductsByLimit(top, month);
      return res.status(200).json(topSellingProducts);
    }

    const results = await getFullOrders(orders);
    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
};

export const getOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.get("user-id");
    if (!userId) {
      throw new UnauthorizedError(
        "You must be authenticated to access this resource"
      );
    }
    const { id } = req.params;
    const order = await findOrderById(id, userId);
    const [result] = await getFullOrders([order]);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// Private route for microservice communication
export const getOrderByReference = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { reference } = req.params;
    const order = await findOrderByReference(reference);
    const [result] = await getFullOrders([order]);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const patchOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await updateOrder(id, { status });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export const getCustomerOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: customerId } = req.params;
    const orders = await findOrdersByCustomerId(customerId);
    const results = await getFullOrders(orders);
    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
};

export const getOrdersCount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.get("user-id");
    const role = req.get("user-role");

    if (!userId || !role) {
      throw new UnauthorizedError(
        "You must be authenticated to access this resource"
      );
    }

    if (role !== EUserRole.Admin) {
      throw new UnauthorizedError(
        "You must be an admin to access this resource"
      );
    }

    const { status }: { status?: string } = req.query;
    const { month }: { month?: number } = req.query;

    if (status) {
      const nbOrders = await countOrders(status);
      return res.status(200).json(nbOrders);
    }

    if (month) {
      const nbOrdersPerMonth = await countConfirmedOrdersByMonths(month);
      return res.status(200).json(nbOrdersPerMonth);
    }

    const nbOrders = await countOrders();
    res.status(200).json(nbOrders);
  } catch (error) {
    next(error);
  }
};

export const getTotalAmount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.get("user-id");
    const role = req.get("user-role");

    if (!userId || !role) {
      throw new UnauthorizedError(
        "You must be authenticated to access this resource"
      );
    }

    if (role !== EUserRole.Admin) {
      throw new UnauthorizedError(
        "You must be an admin to access this resource"
      );
    }

    const { month = 0 }: { month?: number } = req.query;

    if (month && isNaN(month)) {
      throw new BadRequestError("Month must be a number");
    }

    const totalAmount = await countTotalAmount(month);
    res.status(200).json(totalAmount);
  } catch (error) {
    next(error);
  }
};

export const getTotalSoldProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.get("user-id");
    const role = req.get("user-role");

    if (!userId || !role) {
      throw new UnauthorizedError(
        "You must be authenticated to access this resource"
      );
    }

    if (role !== EUserRole.Admin) {
      throw new UnauthorizedError(
        "You must be an admin to access this resource"
      );
    }

    const { month = 0 }: { month?: number } = req.query;

    if (month && isNaN(month)) {
      throw new BadRequestError("Month must be a number");
    }

    const totalSoldProducts = await countTotalSoldProducts(month);
    res.status(200).json(totalSoldProducts);
  } catch (error) {
    next(error);
  }
};

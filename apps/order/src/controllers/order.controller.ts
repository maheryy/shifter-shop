import { BadRequestError } from "@shifter-shop/errors";
import { EOrderStatus } from "@shifter-shop/types";
import { NextFunction, Request, Response } from "express";
import {
  findAllOrders,
  findOrder,
  findOrdersByCustomerId,
  createOrder as create,
  updateOrder as update,
  generateOrderReference,
} from "services/order.service";
import { TOrderCreationData, TOrderUpdateData } from "types/order";

export const createOrder = async (
  data: Omit<TOrderCreationData, "reference">
) => {
  const orderData: TOrderCreationData = {
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
      "Invalid status : must be one of 'Pending', 'Confirmed', 'Shipping', 'Delivered', 'Cancelled'"
    );
  }

  const result = await update(id, { status: data.status });
  return result;
};

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
    const orders = await findAllOrders();
    res.status(200).json(orders);
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
    const { id } = req.params;
    const order = await findOrder(id);
    res.status(200).json(order);
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

    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

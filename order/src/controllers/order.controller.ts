import { Request, Response } from "express";
import {
  findAllOrders,
  findOrder,
  findOrdersByCustomerId,
  createOrder as create,
  updateOrder as update,
  generateOrderReference,
} from "services/order.service";
import { OrderCreationData, OrderStatus } from "types/order";

export const createOrder = async (data: OrderCreationData) => {
  try {
    const orderData: OrderCreationData = {
      customer: data.customer,
      reference: await generateOrderReference(),
      total: 200,
      products: data.products,
    };
    const order = await create(orderData);
    return order;
  } catch (error) {
    console.log(error);
  }
};

export const newOrder = async (req: Request, res: Response) => {
  const order = await createOrder(req.body);

  res.status(201).json(order);
};

export const getAllOrders = async (req: Request, res: Response) => {
  const orders = await findAllOrders();

  res.status(200).json(orders);
};

export const getOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const order = await findOrder(id);

  if (!order) {
    return res
      .status(404)
      .json({ error: { code: 404, message: "Order not found" } });
  }
  res.status(200).json(order);
};

export const updateOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    if (!status) {
      throw new Error("You must provide a status");
    }
    if (!Object.values(OrderStatus).includes(status)) {
      throw new Error(
        "Invalid status : must be one of 'Pending', 'Confirmed', 'Shipping', 'Delivered', 'Cancelled'"
      );
    }

    const result = await update(id, { status });
    if (!result.affected) {
      throw new ReferenceError("Order not found");
    }

    res.status(204).end();
  } catch (error) {
    console.log((error as Error).message);
    const code = error instanceof ReferenceError ? 404 : 400;
    res
      .status(code)
      .json({ error: { code: code, message: (error as Error).message } });
  }
};

export const getCustomerOrders = async (req: Request, res: Response) => {
  const { id: customerId } = req.params;
  const order = await findOrdersByCustomerId(customerId);

  if (!order) {
    return res
      .status(404)
      .json({ error: { code: 404, message: "Order not found" } });
  }

  res.status(200).json(order);
};

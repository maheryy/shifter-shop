import { OrderCreatedData } from "types/message";

export const onOrderCreated = (data: OrderCreatedData) => {
  console.log("onOrderCreated", data);
};

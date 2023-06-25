import { TOrderCreatedData, TPaymentSuccessData } from "./data";

export enum EExchange {
  OrderCreated = "order:created", // empty cart + send email
  PaymentSuccess = "payment:success", // create order + send email
  ReviewCreated = "review:created", // update product rating + send email
}

export interface TExchangeMapping {
  [EExchange.OrderCreated]: TOrderCreatedData;
  [EExchange.PaymentSuccess]: TPaymentSuccessData;
  [EExchange.ReviewCreated]: null;
}

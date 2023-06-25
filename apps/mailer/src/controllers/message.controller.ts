import { TOrderCreatedData } from "@shifter-shop/amqp";

export const onOrderCreated = async (data: TOrderCreatedData) => {
  console.log("[mailer] onOrderCreated", data);
};

export const onPaymentSuccess = async (data: any) => {
  console.log("[mailer] PaymentSuccess", data);
};

export const onReviewCreated = async (data: any) => {
  console.log("[mailer] ReviewCreated", data);
};

export const onOrderStatusChanged = async (data: any) => {
  console.log("[mailer] OrderStatusChanged", data);
};

export const onUserPasswordChanged = async (data: any) => {
  console.log("[mailer] UserPasswordChanged", data);
};

export const onUserPasswordReset = async (data: any) => {
  console.log("[mailer] UserPasswordReset", data);
};

export const onUserRegistered = async (data: any) => {
  console.log("[mailer] UserRegistered", data);
};


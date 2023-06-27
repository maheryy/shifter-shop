import {
  TOrderCreatedData,
  TOrderStatusChangedData,
  TPaymentSuccessData,
  TReviewCreatedData,
  TUserPasswordChangedData,
  TUserPasswordResetData,
  TUserRegisteredData,
} from "@shifter-shop/amqp";

export const onReviewCreated = async (data: TReviewCreatedData) => {
  console.log("[mailer] ReviewCreated", data);
};

export const onUserRegistered = async (data: TUserRegisteredData) => {
  console.log("[mailer] UserRegistered", data);
};

export const onUserPasswordChanged = async (data: TUserPasswordChangedData) => {
  console.log("[mailer] UserPasswordChanged", data);
};

export const onUserPasswordReset = async (data: TUserPasswordResetData) => {
  console.log("[mailer] UserPasswordReset", data);
};
export const onOrderCreated = async (data: TOrderCreatedData) => {
  console.log("[mailer] onOrderCreated", data);
};

export const onOrderStatusChanged = async (data: TOrderStatusChangedData) => {
  console.log("[mailer] OrderStatusChanged", data);
};

export const onPaymentSuccess = async (data: TPaymentSuccessData) => {
  console.log("[mailer] PaymentSuccess", data);
};

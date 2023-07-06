import {
  TOrderCreatedData,
  TOrderStatusChangedData,
  TPaymentSuccessData,
  TReviewCreatedData,
  TUserPasswordChangedData,
  TUserPasswordResetData,
  TUserRegisteredData,
} from "@shifter-shop/amqp";
import mailer from "lib/mailer";
import { fetchJson, fetchService } from "@shifter-shop/helpers";
import { EService, TUser } from "@shifter-shop/dictionary";

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
  try {
    const user = await fetchJson<TUser>({
      service: EService.User,
      endpoint: `/${data.customerId}`,
    });

    const htmlReq = await fetchService(
      {
        service: EService.Mailer,
        endpoint: "/html/order-created",
      },
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/html",
        },
        body: JSON.stringify({ data: { order: data, customer: user } }),
      }
    );

    const html = await htmlReq.text();
    await mailer.sendMail({
      to: user.email,
      subject: "Order confirmed",
      html: html,
    });
  } catch (error) {
    console.error(error);
  }
};

export const onOrderStatusChanged = async (data: TOrderStatusChangedData) => {
  console.log("[mailer] OrderStatusChanged", data);
};

export const onPaymentSuccess = async (data: TPaymentSuccessData) => {
  console.log("[mailer] PaymentSuccess", data);
};

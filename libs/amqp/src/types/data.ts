import {
  TOrder,
  TProductReferenceWithQuantity,
  TReview,
  TUser,
} from "@shifter-shop/types";

export interface TPaymentSuccessData {
  customerId: string;
  amount: number;
  products: TProductReferenceWithQuantity[];
}

export type TOrderCreatedData = TOrder;

export type TReviewCreatedData = TReview;

export type TOrderStatusChangedData = TOrder;

export type TUserRegisteredData = TUser;

export type TUserLoginData = TUser;

export type TUserPasswordResetData = TUser;

export type TUserPasswordChangedData = TUser;

export type TCheckoutRequestedData = null;

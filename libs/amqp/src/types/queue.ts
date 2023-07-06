import {
  TCheckoutRequestedData,
  TOrderStatusChangedData,
  TUserLoginData,
  TUserPasswordChangedData,
  TUserPasswordResetData,
  TUserRegisteredData,
} from "./data";

export enum EQueue {
  OrderStatusChanged = "order:status:changed", // send email
  CheckoutRequested = "checkout:requested", // ?? register metadata somewhere ??
  UserRegistered = "user:registered", // send email
  UserLogin = "user:login", // ?? register metadata somewhere ??
  UserPasswordReset = "user:password:reset", // send email
  UserPasswordChanged = "user:password:changed", // send email
}

export interface TQueueMapping {
  [EQueue.OrderStatusChanged]: TOrderStatusChangedData;
  [EQueue.CheckoutRequested]: TCheckoutRequestedData;
  [EQueue.UserRegistered]: TUserRegisteredData;
  [EQueue.UserLogin]: TUserLoginData;
  [EQueue.UserPasswordReset]: TUserPasswordResetData;
  [EQueue.UserPasswordChanged]: TUserPasswordChangedData;
}

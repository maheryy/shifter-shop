export enum EQueue {
  OrderStatusChanged = "order:status:changed", // send email
  CheckoutRequested = "checkout:requested", // ?? register metadata somewhere ??
  UserRegistered = "user:registered", // send email
  UserLogin = "user:login", // ?? register metadata somewhere ??
  UserPasswordReset = "user:password:reset", // send email
  UserPasswordChanged = "user:password:changed", // send email
}

export interface TQueueMapping {
  [EQueue.OrderStatusChanged]: null;
  [EQueue.CheckoutRequested]: null;
  [EQueue.UserRegistered]: null;
  [EQueue.UserLogin]: null;
  [EQueue.UserPasswordReset]: null;
  [EQueue.UserPasswordChanged]: null;
}

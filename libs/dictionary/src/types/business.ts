export interface TBusinessRequest {
  id: string;
  customerId: string;
  title: string;
  description: string;
  date: Date;
  status: EBusinessRequestStatus;
}

export enum EBusinessRequestStatus {
  Pending = "PENDING",
  Approved = "APPROVED",
  Rejected = "REJECTED",
}

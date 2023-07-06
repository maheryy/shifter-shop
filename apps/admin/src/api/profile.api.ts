import api from "@/api";
import {
  EBusinessRequestStatus,
  TBusinessRequest,
} from "@shifter-shop/dictionary";

export const getBusinessRequests = async (
  status?: EBusinessRequestStatus
): Promise<TBusinessRequest[]> => {
  return api.get(`/profile/business/requests?status=${status}`).json();
};

export const setBusinessRequestStatus = async (
  businessRequestId: string,
  status: EBusinessRequestStatus
): Promise<void> => {
  return api.patch({ status }, `/profile/business/${businessRequestId}`).res();
};

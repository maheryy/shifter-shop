import { arraytoBuffer } from "utils/converter";
import {
  HttpError,
  InternalServerError,
  NotFoundError,
} from "@shifter-shop/errors";
import { EService, TOrder } from "@shifter-shop/dictionary";
import { fetchJson, fetchService } from "@shifter-shop/helpers";

export const getOrder = async (reference: string): Promise<TOrder> => {
  try {
    const order = await fetchJson<TOrder>({
      service: EService.Order,
      endpoint: `/reference/${reference.toUpperCase()}`,
    });
    return order;
  } catch (error) {
    if (error instanceof HttpError && error.status === 404) {
      throw new NotFoundError("The associated order was not found");
    }
    throw error;
  }
};

export const getInvoiceContent = async (order: TOrder): Promise<Buffer> => {
  const response = await fetchService(
    { service: EService.Files, endpoint: "pdf/invoice" },
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/pdf",
      },
      body: JSON.stringify({ data: { order } }),
    }
  );

  if (!response.ok) {
    throw new InternalServerError(
      "Unable to generate invoice : " + response.statusText
    );
  }

  const arrayBuffer = await response.arrayBuffer();
  return arraytoBuffer(arrayBuffer);
};

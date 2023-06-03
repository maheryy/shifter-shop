import { Order } from "types/order";
import { arraytoBuffer } from "utils/converter";
import { ServiceType, fetchService } from "@shifter-shop/registry";

export const getOrder = async (reference: string): Promise<Order> => {
  // TODO: fetch order from database
  const order: Order = {
    id: 1,
    customer: {
      id: "123",
      firstname: "John Doe",
      lastname: "Doe",
      email: "j@j.com",
      profile: {
        address: "123, Street",
      },
    },
    date: new Date("2021-01-01"),
    reference: reference,
    status: "paid",
    total: 500,
    products: [
      {
        product: {
          id: "123",
          name: "Product 1",
          price: 100,
        },
        quantity: 1,
      },
      {
        product: {
          id: "456",
          name: "Product 2",
          price: 200,
        },
        quantity: 2,
      },
    ],
  };

  return order;
};

export const getInvoiceContent = async (order: Order): Promise<Buffer> => {
  const response = await fetchService(
    { service: ServiceType.Files, endpoint: "pdf/invoice" },
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
    throw new Error("Unable to generate invoice : " + response.statusText);
  }

  const arrayBuffer = await response.arrayBuffer();
  return arraytoBuffer(arrayBuffer);
};

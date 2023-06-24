import { StripeMetadata } from "types/stripe";
import stripe from "lib/stripe";
import Stripe from "stripe";

export const createCheckoutSession = async (userId: string) => {
  // TODO: Get user cart products here

  const products = [
    {
      id: "1",
      name: "Product 1",
      price: 10,
      quantity: 1,
    },
    {
      id: "2",
      name: "Product 2",
      price: 20,
      quantity: 2,
    },
    {
      id: "3",
      name: "Product 3",
      price: 30,
      quantity: 3,
    },
  ];

  return stripe.checkout.sessions.create({
    line_items: getCheckoutItems(products),
    currency: "eur",
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/checkout/success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
    metadata: { data: generateMetadata(userId, products) },
  });
};

const getCheckoutItems = (
  products: any[]
): Stripe.Checkout.SessionCreateParams.LineItem[] => {
  return products.map((product) => ({
    price_data: {
      currency: "eur",
      unit_amount: product.price * 100,
      product_data: { name: product.name },
    },
    quantity: product.quantity,
  }));
};

export const getWebhookEvent = (
  payload: Buffer | string,
  signature: string
) => {
  return stripe.webhooks.constructEventAsync(
    payload,
    signature,
    process.env.STRIPE_WEBHOOK_SIGNING_SECRET!
  );
};

const generateMetadata = (customerId: string, products: any[]): string => {
  return JSON.stringify({
    customerId: customerId,
    products: products.map((p) => ({ id: p.id, quantity: p.quantity })),
    amount: products.reduce((acc, p) => acc + p.price * p.quantity, 0),
  } as StripeMetadata);
};

export const parseMetadata = (
  metadata: Stripe.Metadata | null
): StripeMetadata => {
  if (!metadata || !metadata.data) {
    throw new Error("No metadata");
  }
  return JSON.parse(metadata.data) as StripeMetadata;
};

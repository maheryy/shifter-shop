import { StripeMetadata } from "types/stripe";
import stripe from "lib/stripe";
import Stripe from "stripe";
import { EService, TFullCartItem } from "@shifter-shop/types";
import { fetchJson } from "@shifter-shop/helpers";

export const createCheckoutSession = async (userId: string) => {
  const items = await fetchJson<TFullCartItem[]>(
    { service: EService.Cart, endpoint: "/" },
    { headers: { "user-id": userId } }
  );

  return stripe.checkout.sessions.create({
    line_items: getCheckoutItems(items),
    currency: "eur",
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/checkout/success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
    metadata: { data: generateMetadata(userId, items) },
  });
};

const getCheckoutItems = (
  items: TFullCartItem[]
): Stripe.Checkout.SessionCreateParams.LineItem[] => {
  return items.map((item) => ({
    price_data: {
      currency: "eur",
      unit_amount: Math.floor(item.product.price) * 100,
      product_data: { name: item.product.name },
    },
    quantity: item.quantity,
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

const generateMetadata = (
  customerId: string,
  items: TFullCartItem[]
): string => {
  return JSON.stringify({
    customerId: customerId,
    products: items.map((item) => ({
      id: item.product.id,
      quantity: item.quantity,
    })),
    amount: items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    ),
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

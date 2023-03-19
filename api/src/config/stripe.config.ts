import { registerAs } from '@nestjs/config';

export default registerAs('stripe', () => ({
  secretKey: process.env.STRIPE_SECRET_KEY,
  publicKey: process.env.STRIPE_PUBLIC_KEY,
  signingSecret: process.env.STRIPE_WEBHOOK_SIGNING_SECRET,
}));

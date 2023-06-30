import { z } from "zod";

export const CustomerProfile = z.object({
  id: z.string().uuid(),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  zip: z.string().optional(),
});

export const BusinessProfile = z.object({
  id: z.string().uuid(),
  company: z.string(),
  website: z.string().optional(),
  phone: z.string().optional(),
  address: z.string(),
  city: z.string(),
  country: z.string(),
  zip: z.string(),
});

export type TCustomerProfile = z.infer<typeof CustomerProfile>;
export type TBusinessProfile = z.infer<typeof BusinessProfile>;

import { z } from "zod";
import { CustomerProfile } from "./profile";

const Address = z.object({
  id: z.string().uuid(),
  profile: CustomerProfile,
  fullName: z.string(),
  line1: z.string(),
  line2: z.string().optional(),
  city: z.string(),
  zip: z.string(),
  province: z.string(),
  phone: z.string(),
  isDefault: z.boolean(),
});

export const CheckoutAddress = Address.omit({
  id: true,
  profile: true,
  isDefault: true,
});

export const CreateAddress = CheckoutAddress.extend({
  setDefault: z.boolean().optional(),
});

export const UpdateAddress = CreateAddress.partial();

export type TAddress = z.infer<typeof Address>;
export type TCheckoutAddress = z.infer<typeof CheckoutAddress>;
export type TCreateAddress = z.infer<typeof CreateAddress>;
export type TUpdateAddress = z.infer<typeof UpdateAddress>;

export default Address;

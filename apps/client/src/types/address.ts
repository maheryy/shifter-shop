import { z } from "zod";
import { CustomerProfile } from "./profile";

const Address = z.object({
  id: z.string().uuid(),
  profile: CustomerProfile,
  fullName: z.string(),
  address1: z.string(),
  address2: z.string().optional(),
  city: z.string(),
  zip: z.string(),
  province: z.string(),
  phone: z.string(),
  isDefault: z.boolean(),
});

const CreateAddress = Address.omit({ id: true, profile: true });
const UpdateAddress = CreateAddress.partial();

export type Address = z.infer<typeof Address>;
export type CreateAddress = z.infer<typeof CreateAddress>;
export type UpdateAddress = z.infer<typeof UpdateAddress>;

export default Address;

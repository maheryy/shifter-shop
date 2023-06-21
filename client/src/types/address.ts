import { z } from "zod";

const Address = z.object({
  id: z.number(),
  user: z.number(),
  fullName: z.string(),
  address1: z.string(),
  address2: z.string().optional(),
  city: z.string(),
  zip: z.string(),
  province: z.string(),
  phone: z.string(),
});

const CreateAddress = Address.omit({ id: true, user: true });

export type Address = z.infer<typeof Address>;
export type CreateAddress = z.infer<typeof CreateAddress>;

export default Address;

import { z } from "zod";
import isMobilePhone from "validator/lib/isMobilePhone";

export const Address = z.object({
  fullName: z.string().trim().min(1, { message: "Required" }),
  line1: z.string().trim().min(1, { message: "Required" }),
  line2: z.string().optional(),
  city: z.string().trim().min(1, { message: "Required" }),
  zip: z.string().trim().min(1, { message: "Required" }),
  province: z.string().trim().min(1, { message: "Required" }),
  phone: z.string().refine((phone) => isMobilePhone(phone, "fr-FR"), {
    message: "Invalid phone number",
  }),
});

export type TAddress = z.infer<typeof Address>;

import { SubmitHandler, UseFormReturn } from "react-hook-form";
import isMobilePhone from "validator/es/lib/isMobilePhone";
import { z } from "zod";
import Form from "@/components/Form";
import Input from "@/components/Input";

export const addressSchema = z.object({
  address: z.object({
    fullName: z.string().trim().min(1, { message: "Required" }),
    line1: z.string().trim().min(1, { message: "Required" }),
    line2: z.string().optional(),
    city: z.string().trim().min(1, { message: "Required" }),
    zip: z.string().trim().min(1, { message: "Required" }),
    province: z.string().trim().min(1, { message: "Required" }),
    phone: z.string().refine((phone) => isMobilePhone(phone, "fr-FR"), {
      message: "Invalid phone number",
    }),
    setDefault: z.boolean().optional(),
  }),
});

export type AddressFieldValues = z.infer<typeof addressSchema>;

interface AddressProps {
  children: React.ReactNode;
  form: UseFormReturn<AddressFieldValues>;
  onSubmit: SubmitHandler<AddressFieldValues>;
}

function AddressForm({ onSubmit, form, children }: AddressProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        errorMessage={errors.address?.fullName?.message}
        id="address.fullName"
        label="Full name"
        register={register}
      />
      <Input
        errorMessage={errors.address?.line1?.message}
        id="address.line1"
        label="Address line 1"
        register={register}
      />
      <Input
        errorMessage={errors.address?.line2?.message}
        id="address.line2"
        label="Address line 2"
        placeholder="(Optional) Apt, suite, building, unit, floor, etc"
        register={register}
      />
      <div className="grid gap-8 lg:grid-cols-2">
        <Input
          errorMessage={errors.address?.city?.message}
          id="address.city"
          label="City"
          register={register}
        />
        <Input
          errorMessage={errors.address?.zip?.message}
          id="address.zip"
          label="ZIP code"
          register={register}
        />
      </div>
      <Input
        errorMessage={errors.address?.province?.message}
        id="address.province"
        label="Province"
        register={register}
      />
      <div className="grid gap-2">
        <Input
          errorMessage={errors.address?.phone?.message}
          id="address.phone"
          label="Phone number"
          register={register}
          type="tel"
        />
        <p>In case there are questions about delivering your order.</p>
      </div>
      <div className="flex gap-2">
        <input
          id="setDefault"
          type="checkbox"
          {...register("address.setDefault")}
        />
        <label htmlFor="setDefault">Set as default</label>
      </div>
      {children}
    </Form>
  );
}

export default AddressForm;

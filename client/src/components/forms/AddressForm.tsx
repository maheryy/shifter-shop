import { SubmitHandler, UseFormReturn } from "react-hook-form";
import isMobilePhone from "validator/es/lib/isMobilePhone";
import { z } from "zod";
import Form from "@/components/Form";
import Input from "@/components/Input";

export const addressSchema = z.object({
  address: z.object({
    fullName: z.string().nonempty({ message: "Required" }),
    address1: z.string().nonempty({ message: "Required" }),
    address2: z.string().optional(),
    city: z.string().nonempty({ message: "Required" }),
    zip: z.string().nonempty({ message: "Required" }),
    province: z.string().nonempty({ message: "Required" }),
    phone: z
      .string()
      .refine(isMobilePhone, { message: "Invalid phone number" }),
    isDefault: z.boolean().optional(),
  }),
});

export type AddressFormInputs = z.infer<typeof addressSchema>;

interface AddressProps {
  children: React.ReactNode;
  form: UseFormReturn<AddressFormInputs>;
  onSubmit: SubmitHandler<AddressFormInputs>;
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
        errorMessage={errors.address?.address1?.message}
        id="address.address1"
        label="Address"
        register={register}
      />
      <Input
        errorMessage={errors.address?.address2?.message}
        id="address.address2"
        label="Address"
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
          id="isDefault"
          type="checkbox"
          {...register("address.isDefault")}
        />
        <label htmlFor="isDefault">Set as default</label>
      </div>
      {children}
    </Form>
  );
}

export default AddressForm;

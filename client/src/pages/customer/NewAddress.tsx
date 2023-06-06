import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import Address from "@/components/account/Address";
import Button from "@/components/Button";
import Form from "@/components/Form";
import Input from "@/components/Input";

export interface AddressesData {
  addresses: Address[];
}

const schema = z.object({
  address: z.object({
    address1: z.string().nonempty({ message: "Required" }),
    address2: z.string().optional(),
    zip: z.string().nonempty({ message: "Required" }),
    city: z.string().nonempty({ message: "Required" }),
    state: z.string().nonempty({ message: "Required" }),
  }),
});

type Inputs = z.infer<typeof schema>;

function NewAddress() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<Inputs> = useCallback((data) => {
    console.log(data);

    toast("Not implemented");
  }, []);

  return (
    <section className="grid gap-8">
      <Link className="md:hidden" to="/account/addresses">
        &lt; Back
      </Link>
      <div className="grid gap-8 rounded md:justify-items-center md:p-4 md:shadow">
        <h1 className="text-xl font-medium capitalize">Add a new address</h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            errorMessage={errors.address?.address1?.message}
            id="address.address1"
            label="Street address"
            register={register}
          />
          <Input
            errorMessage={errors.address?.address2?.message}
            id="address.address2"
            label="Suite, unit, floor (optional)"
            register={register}
          />
          <Input
            errorMessage={errors.address?.zip?.message}
            id="address.zip"
            label="ZIP code"
            register={register}
          />
          <Input
            errorMessage={errors.address?.city?.message}
            id="address.city"
            label="City"
            register={register}
          />
          <Input
            errorMessage={errors.address?.state?.message}
            id="address.state"
            label="State"
            register={register}
          />
          <div className="flex gap-2">
            <input id="isDefault" type="checkbox" />
            <label htmlFor="isDefault">Set as default</label>
          </div>
          <Button>Add address</Button>
        </Form>
      </div>
    </section>
  );
}

export default NewAddress;

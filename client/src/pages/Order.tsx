import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import isMobilePhone from "validator/es/lib/isMobilePhone";
import { z } from "zod";
import Button from "@/components/Button";
import Form from "@/components/Form";
import Input from "@/components/Input";
import { Address } from "@/types/address";
import { StripePayload } from "@/types/stripe";

export interface OrderData {
  addresses?: Address[];
}

const schema = z.object({
  phoneNumber: z
    .string()
    .refine(isMobilePhone, { message: "Invalid phone number" }),
  address: z.object({
    address1: z.string().nonempty({ message: "Required" }),
    address2: z.string().optional(),
    zip: z.string().nonempty({ message: "Required" }),
    city: z.string().nonempty({ message: "Required" }),
    state: z.string().nonempty({ message: "Required" }),
  }),
});

type Inputs = z.infer<typeof schema>;

function Order() {
  const { addresses } = useLoaderData() as OrderData;
  const hasAddresses = !!addresses?.length;
  const [primaryAddress] = addresses || [undefined];

  const [selectedAddressId, setSelectedAddressId] = useState(
    primaryAddress?.id,
  );

  function getUseFormOptions() {
    const options = {
      resolver: zodResolver(schema),
    };

    if (hasAddresses) {
      const [address] = addresses;

      const defaultValues = {
        address,
      };

      return {
        defaultValues,
        ...options,
      };
    }

    return options;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Inputs>(getUseFormOptions());

  const onSubmit: SubmitHandler<Inputs> = useCallback(async (data) => {
    try {
      console.log(data);

      checkout();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }, []);

  async function checkout() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/stripe/checkout`,
        {
          method: "POST",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to create order.");
      }

      const data = (await response.json()) as StripePayload;

      if (!data.url) {
        throw new Error("No redirect url returned from server.");
      }

      window.location.assign(data.url);
    } catch (error) {
      console.error(error);
    }
  }

  function getReadableAddress({
    address1,
    address2,
    city,
    state,
    zip,
  }: Omit<Address, "id">) {
    const mandatoryPart = `, ${zip} ${city}, ${state}`;

    if (!address2) {
      return address1 + mandatoryPart;
    }

    return `${address1}, ${address2}` + mandatoryPart;
  }

  const onAddressChange = useCallback(
    ({ target }: ChangeEvent<HTMLSelectElement>) => {
      const { value } = target;

      const selectedAddressId = Number(value);

      setSelectedAddressId(selectedAddressId);

      if (!addresses?.length) {
        return;
      }

      const address = addresses.find(({ id }) => id === selectedAddressId);

      if (!address) {
        return;
      }

      setValue("address", address);

      if (!address.address2) {
        setValue("address.address2", undefined);
      }
    },
    [addresses, setValue],
  );

  return (
    <section className="container grid gap-8 py-16 md:justify-items-center">
      <h1 className="text-2xl font-bold">Shipping details</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <h2 className="text-lg font-medium">Shipping address</h2>
          {hasAddresses && (
            <div className="grid gap-2">
              <label htmlFor="addresses">Registered adresses</label>
              <select
                className="rounded border-gray-300 px-4 py-3 text-sm text-gray-600 shadow-sm focus:border-primary focus:ring-primary md:w-96"
                id="addresses"
                onChange={onAddressChange}
                value={selectedAddressId}
              >
                {addresses.map(({ id, ...address }) => (
                  <option key={id} value={id}>
                    {getReadableAddress(address)}
                  </option>
                ))}
              </select>
            </div>
          )}
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
        </div>
        <div className="grid gap-4">
          <h2 className="text-lg font-medium">Contact information</h2>
          <Input
            errorMessage={errors.phoneNumber?.message}
            id="phoneNumber"
            label="Phone number"
            register={register}
          />
        </div>
        <Button>Proceed to checkout</Button>
      </Form>
    </section>
  );
}

export default Order;

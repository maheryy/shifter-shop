import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { getAdresses } from "@/api/address.api";
import Button from "@/components/Button";
import AddressForm, {
  AddressFieldValues,
  addressSchema,
} from "@/components/forms/AddressForm";
import { useData } from "@/hooks/useData";
import { Address } from "@/types/address";
import { StripePayload } from "@/types/stripe";
import isEmpty from "@/utils/isEmpty";

export interface OrderData {
  addresses: Address[];
}

export async function checkoutLoader(): Promise<OrderData> {
  const addresses = await getAdresses();

  return { addresses };
}

function Checkout() {
  const { addresses } = useData<OrderData>();
  const hasAddresses = !isEmpty(addresses);
  const [primaryAddress] = hasAddresses ? addresses : [undefined];

  const [selectedAddressId, setSelectedAddressId] = useState(
    primaryAddress?.id,
  );

  const form = useForm<AddressFieldValues>(getUseFormOptions(addresses));
  const { setValue } = form;

  const onSubmit: SubmitHandler<AddressFieldValues> = useCallback(
    async (data) => {
      try {
        console.log(data);

        checkout();
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    },
    [],
  );

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
      {hasAddresses && (
        <div className="grid gap-2">
          <label htmlFor="addresses">Registered adresses</label>
          <select
            className="rounded border-gray-300 px-4 py-3 text-sm text-gray-600 shadow-sm focus:border-primary focus:ring-primary"
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
      <AddressForm form={form} onSubmit={onSubmit}>
        <Button className="justify-self-center">Proceed to checkout</Button>
      </AddressForm>
    </section>
  );
}

function getUseFormOptions(addresses: Address[]) {
  const options = {
    resolver: zodResolver(addressSchema),
  };

  if (isEmpty(addresses)) {
    return options;
  }

  const [address] = addresses;

  const defaultValues = {
    address,
  };

  return {
    ...options,
    defaultValues,
  };
}

function getReadableAddress({
  fullName,
  address1,
  address2,
  city,
  province,
  zip,
}: Omit<Address, "id">) {
  const mandatoryStart = `${fullName}, ${address1}`;
  const mandatoryEnd = `, ${zip} ${city}, ${province}`;

  if (!address2) {
    return mandatoryStart + mandatoryEnd;
  }

  return mandatoryStart + `, ${address2}` + mandatoryEnd;
}

export default Checkout;

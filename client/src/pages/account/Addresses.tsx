import { Link } from "react-router-dom";
import { getAdresses } from "@/api/address.api";
import Address from "@/components/account/Address";
import { useData } from "@/hooks/useData";

export interface AddressesData {
  addresses: Address[];
}

export async function addressesLoader(): Promise<AddressesData> {
  const addresses = await getAdresses();

  return { addresses };
}

function Addresses() {
  const { addresses } = useData<AddressesData>();

  return (
    <section className="grid gap-8">
      <Link className="md:hidden" to="/account">
        &lt; Back
      </Link>
      <div className="grid gap-8 rounded md:justify-items-center md:p-4 md:shadow">
        <h1 className="text-xl font-medium capitalize">Saved addresses</h1>
        <Link
          className="w-full rounded-md border border-primary bg-primary px-4 py-3 text-center text-sm font-medium uppercase text-white transition hover:bg-transparent hover:text-primary md:max-w-md"
          to="/account/addresses/new"
        >
          Add new
        </Link>
        <div className="grid w-full gap-8 md:grid-cols-2">
          {addresses.map((address) => (
            <Address key={address.id} {...address} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Addresses;

import addresses from "@data/addresses.json";
import { Link } from "react-router-dom";
import Address from "@/components/account/Address";

export interface AddressesData {
  addresses: Address[];
}

function Addresses() {
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
          {addresses.map(({ id, ...address }) => (
            <Address key={id} {...address} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Addresses;

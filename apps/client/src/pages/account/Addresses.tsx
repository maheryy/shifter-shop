import { Link } from "react-router-dom";
import Address from "@/components/account/Address";
import useAddresses from "@/hooks/useAddresses";
import { TAddress } from "@/types/address";

function Addresses() {
  const { data, isError, isLoading } = useAddresses();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong...</div>;
  }

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
          {sortAddresses(data).map((address) => (
            <Address key={address.id} {...address} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Addresses;

function sortAddresses(addresses: TAddress[]): TAddress[] {
  return [...addresses].sort((a, b) => {
    if (a.isDefault) {
      return -1;
    }

    if (b.isDefault) {
      return 1;
    }

    return 0;
  });
}

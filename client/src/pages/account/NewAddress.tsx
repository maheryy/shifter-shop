import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Address from "@/components/account/Address";
import Button from "@/components/Button";
import AddressForm, {
  AddressFieldValues,
} from "@/components/forms/AddressForm";

export interface AddressesData {
  addresses: Address[];
}

function NewAddress() {
  const form = useForm<AddressFieldValues>();

  const onSubmit: SubmitHandler<AddressFieldValues> = useCallback((data) => {
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
        <AddressForm form={form} onSubmit={onSubmit}>
          <div className="grid justify-items-center gap-8">
            <Button>Add address</Button>
            <Link to="/account/addresses">Cancel</Link>
          </div>
        </AddressForm>
      </div>
    </section>
  );
}

export default NewAddress;

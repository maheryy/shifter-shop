import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import AddressForm, {
  AddressFieldValues,
  addressSchema,
} from "@/components/forms/AddressForm";
import useAddress from "@/hooks/useAddress";

function NewAddress() {
  const { createAddressMutation } = useAddress();
  const form = useForm<AddressFieldValues>({
    resolver: zodResolver(addressSchema),
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<AddressFieldValues> = ({ address }) => {
    createAddressMutation.mutate(address);

    navigate("/account/addresses");
  };

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

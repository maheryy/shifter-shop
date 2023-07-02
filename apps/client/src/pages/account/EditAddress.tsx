import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { getAddress } from "@/api/profile.api";
import Button from "@/components/Button";
import AddressForm, {
  AddressFieldValues,
} from "@/components/forms/AddressForm";
import useAddress from "@/hooks/useAddress";
import { useData } from "@/hooks/useData";
import { TAddress } from "@/types/address";
import { Loader } from "@/types/loader";

interface EditAddressData {
  address: TAddress;
}

export const editAddressLoader: Loader<EditAddressData> = async ({
  params,
}) => {
  const { addressId } = params;

  if (!addressId) {
    throw new Error("Missing required params");
  }

  const address = await getAddress(addressId);

  return {
    address,
  };
};

function EditAddress() {
  const { address } = useData<EditAddressData>();
  const { editAddressMutation } = useAddress();
  const navigate = useNavigate();

  const form = useForm<AddressFieldValues>({
    defaultValues: { address },
  });

  const onSubmit: SubmitHandler<AddressFieldValues> = (data) => {
    editAddressMutation.mutate({
      address: data.address,
      addressId: address.id,
    });

    navigate("/account/addresses");
  };

  return (
    <section className="grid gap-8">
      <Link className="md:hidden" to="/account/addresses">
        &lt; Back
      </Link>
      <div className="grid gap-8 rounded md:justify-items-center md:p-4 md:shadow">
        <h1 className="text-xl font-medium capitalize">Edit your address</h1>
        <AddressForm form={form} onSubmit={onSubmit}>
          <div className="grid justify-items-center gap-8">
            <Button>Edit address</Button>
            <Link to="/account/addresses">Cancel</Link>
          </div>
        </AddressForm>
      </div>
    </section>
  );
}

export default EditAddress;

import TrashIcon from "@icons/trash.svg";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import useAddress from "@/hooks/useAddress";
import { TAddress } from "@/types/address";

type AddressProps = Omit<TAddress, "profile">;

function Address({
  id,
  fullName,
  phone,
  line1,
  line2,
  city,
  province,
  zip,
  isDefault = false,
}: AddressProps) {
  const { deleteAddressMutation, setDefaultAddressMutation } = useAddress();

  function onDelete() {
    deleteAddressMutation.mutate(id);
  }

  function onSetDefault() {
    setDefaultAddressMutation.mutate(id);
  }

  return (
    <div className="grid gap-4 rounded p-4 shadow md:gap-8 md:p-8">
      <div className="grid grid-flow-col">
        <p className="overflow-hidden text-ellipsis">
          {fullName}
          <br />
          {phone}
          <br />
          {line1}
          <br />
          {line2 && (
            <Fragment>
              {line2}
              <br />
            </Fragment>
          )}
          {zip}&nbsp;{city}
          <br />
          {province}
        </p>
        <Link
          className="self-start justify-self-end hover:text-primary"
          to={`/account/addresses/edit/${id}`}
        >
          Edit
        </Link>
      </div>
      <div className="grid grid-flow-col">
        {isDefault ? (
          <div className="font-medium text-primary">default</div>
        ) : (
          <button
            className="w-fit border border-primary px-4 py-1 text-primary hover:bg-primary hover:text-white"
            onClick={onSetDefault}
          >
            Set as default
          </button>
        )}
        <button
          className="w-6 cursor-pointer justify-self-end text-gray-600 hover:text-red-500"
          onClick={onDelete}
        >
          <TrashIcon />
        </button>
      </div>
    </div>
  );
}

export default Address;

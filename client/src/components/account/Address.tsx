import TrashIcon from "@icons/trash.svg";
import { Fragment, useCallback } from "react";
import { toast } from "react-toastify";
import { Address } from "@/types/address";

interface AddressProps extends Omit<Address, "user" | "id"> {
  isDefault?: boolean;
}

function Address({
  address1,
  address2,
  city,
  state,
  zip,
  isDefault = false,
}: AddressProps) {
  const onDelete = useCallback(() => {
    toast("Not implemented");
  }, []);

  const onEdit = useCallback(() => {
    toast("Not implemented");
  }, []);

  const onSetAsDefault = useCallback(() => {
    toast("Not implemented");
  }, []);

  return (
    <div className="grid gap-4 rounded p-4 shadow md:gap-8 md:p-8">
      <div className="grid grid-flow-col">
        <p className="overflow-hidden text-ellipsis">
          {address1}
          <br />
          {address2 && (
            <Fragment>
              {address2}
              <br />
            </Fragment>
          )}
          {zip}&nbsp;{state}
          <br />
          {city}
        </p>
        <button
          className="self-start justify-self-end hover:text-primary"
          onClick={onEdit}
        >
          Edit
        </button>
      </div>
      <div className="grid grid-flow-col">
        {isDefault ? (
          <div className="font-medium text-primary">default</div>
        ) : (
          <button
            className="w-fit border border-primary px-4 py-1 text-primary hover:bg-primary hover:text-white"
            onClick={onSetAsDefault}
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

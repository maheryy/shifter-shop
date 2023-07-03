import BagIcon from "@icons/bag.svg";
import { Link } from "react-router-dom";

function CheckoutSuccess() {
  return (
    <div className="container py-16">
      <div className="m-auto flex w-fit flex-col items-center gap-7">
        <div>
          <div className="mx-auto mb-3 h-12 w-12 text-gray-800">
            <BagIcon />
          </div>
          <h1 className="text-center text-5xl font-semibold text-gray-800">
            Thank you!
          </h1>
        </div>
        <div className="text-center font-roboto text-lg text-gray-800">
          <p className="leading-8">
            Your order has been successfully processed.
          </p>
          <p className="leading-8">
            A confirmation has been sent to your email.
          </p>
          <p className="leading-8">Thank you for choosing our store!</p>
        </div>
        <Link
          className="rounded-md border border-primary bg-primary px-8 py-3 font-medium 
                    text-white hover:bg-transparent hover:text-primary"
          to="/products"
        >
          Continue shopping
        </Link>
      </div>
    </div>
  );
}

export default CheckoutSuccess;

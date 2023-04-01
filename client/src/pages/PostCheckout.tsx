import BagIcon from "../assets/icons/bag.svg";
import { Link } from "react-router-dom";

const PostCheckout = () => {
  return (
    <div className="container py-16">
      <div className="flex flex-col gap-7 w-fit m-auto items-center">
        <div>
          <div className="w-12 h-12 text-gray-800 mx-auto mb-3">
            <BagIcon />
          </div>
          <h1 className="text-5xl font-semibold text-gray-800 text-center">
            Thank you!
          </h1>
        </div>
        <div className="text-lg text-center text-gray-800 font-roboto">
          <p className="leading-8">
            Your order has been successfully processed.
          </p>
          <p className="leading-8">
            A confirmation has been sent to your email.
          </p>
          <p className="leading-8">Thank you for choosing our store!</p>
        </div>
        <Link
          to="/products"
          className="bg-primary border border-primary text-white px-8 py-3 font-medium 
                    rounded-md hover:bg-transparent hover:text-primary"
        >
          Continue shopping
        </Link>
      </div>
    </div>
  );
};

export default PostCheckout;

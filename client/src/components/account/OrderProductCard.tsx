import { Link, useNavigate } from "react-router-dom";
import { ProductWithQuantity } from "@/types/product";
import BagIcon from "@icons/bag.svg";
import StarIcon from "@icons/star-empty.svg";
import { useCartContext } from "@/hooks/context";

const OrderProductCard = ({ product, orderId }: OrderProductCardProps) => {
  const { addToCart } = useCartContext();
  const navigate = useNavigate();

  const buyAgain = () => {
    addToCart(product);
    navigate("/cart");
  };

  const to = `/products/${product.id}`;

  return (
    <div className="py-4 px-6 grid grid-cols-12 text-sm">
      <div className="col-span-9 flex gap-4 items-start">
        <Link to={to} className="basis-16 w-16 h-16">
          <img src={product.image} alt={product.name} />
        </Link>
        <div className="flex flex-col flex-1 gap-1">
          <Link
            className="font-medium text-gray-800 w-fit"
            to={`/products/${product.id}`}
          >
            {product.name}
          </Link>
          <button
            className="px-2 py-1 w-fit text-center border border-primary rounded text-primary hover:bg-primary hover:text-white transition duration-100 flex justify-center items-center gap-2 text-xs"
            onClick={buyAgain}
          >
            <span className="block w-4 relative bottom-0.5">
              <BagIcon />
            </span>
            Buy again
          </button>
        </div>
      </div>
      <div className="col-span-3 flex items-center justify-end">
        <Link
          to={`/account/orders/${orderId}/review/${product.id}`}
          className="px-4 py-2 w-fit text-center border border-primary rounded hover:bg-transparent text-white bg-primary hover:text-primary transition duration-100 flex justify-center items-center gap-2 text-xs"
        >
          <span className="block w-4 relative bottom-0.5">
            <StarIcon />
          </span>
          Review this product
        </Link>
      </div>
    </div>
  );
};

interface OrderProductCardProps {
  product: ProductWithQuantity;
  orderId: number;
}

export default OrderProductCard;

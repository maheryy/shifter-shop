import BagIcon from "@icons/bag.svg";
import StarIcon from "@icons/star-empty.svg";
import { Link, useNavigate } from "react-router-dom";
import { useCartContext } from "@/hooks/context";
import { ProductWithQuantity } from "@/types/product";

const OrderProductCard = ({ product, orderId }: OrderProductCardProps) => {
  const { addToCart } = useCartContext();
  const navigate = useNavigate();

  const buyAgain = () => {
    addToCart(product);
    navigate("/cart");
  };

  const to = `/products/${product.id}`;

  return (
    <div className="grid grid-cols-12 px-6 py-4 text-sm">
      <div className="col-span-9 flex items-start gap-4">
        <Link className="h-16 w-16 basis-16" to={to}>
          <img alt={product.name} src={product.image} />
        </Link>
        <div className="flex flex-1 flex-col gap-1">
          <Link
            className="w-fit font-medium text-gray-800"
            to={`/products/${product.id}`}
          >
            {product.name}
          </Link>
          <button
            className="flex w-fit items-center justify-center gap-2 rounded border border-primary px-2 py-1 text-center text-xs text-primary transition duration-100 hover:bg-primary hover:text-white"
            onClick={buyAgain}
          >
            <span className="relative bottom-0.5 block w-4">
              <BagIcon />
            </span>
            Buy again
          </button>
        </div>
      </div>
      <div className="col-span-3 flex items-center justify-end">
        <Link
          className="flex w-fit items-center justify-center gap-2 rounded border border-primary bg-primary px-4 py-2 text-center text-xs text-white transition duration-100 hover:bg-transparent hover:text-primary"
          to={`/account/orders/${orderId}/review/${product.id}`}
        >
          <span className="relative bottom-0.5 block w-4">
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

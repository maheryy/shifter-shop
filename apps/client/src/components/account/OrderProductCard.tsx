import BagIcon from "@icons/bag.svg";
import StarIcon from "@icons/star-empty.svg";
import { Link, useNavigate } from "react-router-dom";
import useCart from "@/hooks/useCart";
import { OrderProduct } from "@/types/orderProduct";

interface OrderProductCardProps {
  product: OrderProduct;
  orderId: number;
}

function OrderProductCard({ product, orderId }: OrderProductCardProps) {
  const navigate = useNavigate();
  const { addMutation } = useCart();

  const buyAgain = () => {
    addMutation.mutate({
      productToAdd: product,
      quantity: 1,
    });

    navigate("/cart");
  };

  const to = `/products/${product.id}`;
  const { id, name, image } = product;

  return (
    <article className="grid px-6 py-4 text-sm md:grid-cols-12">
      <div className="flex items-start gap-4 md:col-span-9">
        <Link className="h-16 w-16 basis-16" to={to}>
          <img alt={name} src={image} />
        </Link>
        <div className="flex flex-1 flex-col gap-1">
          <Link
            className="w-fit font-medium text-gray-800"
            to={`/products/${id}`}
          >
            {name}
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
      <div className="flex items-center justify-end md:col-span-3">
        <Link
          className="flex w-fit items-center justify-center gap-2 rounded border border-primary bg-primary px-4 py-2 text-center text-xs text-white transition duration-100 hover:bg-transparent hover:text-primary"
          to={`/account/orders/${orderId}/review/${id}`}
        >
          <span className="relative bottom-0.5 block w-4">
            <StarIcon />
          </span>
          Review
        </Link>
      </div>
    </article>
  );
}

export default OrderProductCard;

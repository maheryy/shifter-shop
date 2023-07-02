import TrashIcon from "@icons/trash.svg";
import { Link } from "react-router-dom";
import QuantityPicker from "@/components/QuantityPicker";
import Rating from "@/components/Rating";
import useCart from "@/hooks/useCart";
import { CartProduct } from "@/types/cartProduct";
import { formatPrice } from "@/utils/format";

interface CartProductCardProps {
  cartProduct: CartProduct;
}

function CartProductCard({ cartProduct }: CartProductCardProps) {
  const { updateMutation } = useCart();
  const { product, quantity } = cartProduct;
  const { id, name, image, price, reviewsCount, rating } = product;
  const to = `/products/${id}`;

  function onRemove() {
    updateMutation.mutate({ product, quantity: 0 });
  }

  function onUpdate(quantity: number) {
    updateMutation.mutate({ product, quantity });
  }

  return (
    <article className="grid grid-cols-2 items-center justify-items-center gap-4 rounded border border-gray-200 p-4 md:flex md:justify-between">
      <Link className="md:w-28" to={to}>
        <img alt={name} src={image} />
      </Link>
      <div className="grid gap-4">
        <Link
          className="text-center font-roboto font-medium text-gray-800"
          to={to}
        >
          {name}
        </Link>
        <div className="grid justify-center gap-2 md:flex">
          <Rating size="sm" value={rating} />
          <span className="text-center text-xs text-gray-500">
            ({reviewsCount}) reviews
          </span>
        </div>
      </div>
      <div className="flex justify-center">
        <QuantityPicker onChange={onUpdate} value={quantity} />
      </div>
      <div className="text-lg font-semibold text-primary">
        {formatPrice(price)}
      </div>
      <button
        className="col-start-2 block w-6 cursor-pointer text-gray-600 hover:text-red-500"
        onClick={onRemove}
      >
        <TrashIcon />
      </button>
    </article>
  );
}

export default CartProductCard;

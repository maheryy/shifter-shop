import TrashIcon from "@icons/trash.svg";
import { Link } from "react-router-dom";
import QuantityPicker from "@/components/QuantityPicker";
import Rating from "@/components/Rating";
import { ProductWithQuantity } from "@/types/product";
import { formatPrice } from "@/utils/format";

const CartProductCard = ({
  product,
  updateQuantity,
  deleteProduct,
}: CartProductCardProps) => {
  const to = `/products/${product.id}`;

  return (
    <article className="grid grid-cols-2 items-center justify-items-center gap-4 rounded border border-gray-200 p-4 md:flex md:justify-between">
      <Link className="md:w-28" to={to}>
        <img alt={product.name} src={product.image} />
      </Link>
      <div className="grid gap-4">
        <Link
          className="text-center font-roboto font-medium text-gray-800"
          to={to}
        >
          {product.name}
        </Link>
        <div className="grid justify-center gap-2 md:flex">
          <Rating size="sm" value={4.5} />
          <span className="text-center text-xs text-gray-500">
            (150 reviews)
          </span>
        </div>
      </div>
      <div className="flex justify-center">
        <QuantityPicker
          onChange={(value) => updateQuantity(product.id, value)}
          value={product.quantity}
        />
      </div>
      <div className="text-lg font-semibold text-primary">
        {formatPrice(product.price)}
      </div>
      <button
        className="col-start-2 block w-6 cursor-pointer text-gray-600 hover:text-red-500"
        onClick={() => deleteProduct(product.id)}
      >
        <TrashIcon />
      </button>
    </article>
  );
};

interface CartProductCardProps {
  product: ProductWithQuantity;
  updateQuantity: (id: number, quantity: number) => void;
  deleteProduct: (id: number) => void;
}

export default CartProductCard;

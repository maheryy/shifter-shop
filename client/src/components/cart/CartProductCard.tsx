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
    <div className="flex items-center justify-between gap-6 rounded border border-gray-200 p-4">
      <Link className="w-28" to={to}>
        <img alt={product.name} className="w-full" src={product.image} />
      </Link>
      <div className="flex w-1/3 flex-col gap-4">
        <Link to={to}>
          <span className="font-roboto font-medium text-gray-800">
            {product.name}
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <Rating size="sm" value={4.5} />
          <span className="text-xs text-gray-500">(150 reviews)</span>
        </div>
      </div>
      <QuantityPicker
        onChange={(value) => updateQuantity(product.id, value)}
        value={product.quantity}
      />
      <div className="text-lg font-semibold text-primary">
        {formatPrice(product.price)}
      </div>
      <button onClick={() => deleteProduct(product.id)}>
        <span className="block w-6 cursor-pointer text-gray-600 hover:text-red-500">
          <TrashIcon />
        </span>
      </button>
    </div>
  );
};

interface CartProductCardProps {
  product: ProductWithQuantity;
  updateQuantity: (id: number, quantity: number) => void;
  deleteProduct: (id: number) => void;
}

export default CartProductCard;

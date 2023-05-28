import { Link } from "react-router-dom";
import { ProductWithQuantity } from "@/types/product";
import { formatPrice } from "@/utils/format";
import QuantityPicker from "@/components/QuantityPicker";
import TrashIcon from "@icons/trash.svg";
import Rating from "@/components/Rating";

const CartProductCard = ({
  product,
  updateQuantity,
  deleteProduct,
}: CartProductCardProps) => {
  const to = `/products/${product.id}`;

  return (
    <div className="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded">
      <Link to={to} className="w-28">
        <img src={product.image} alt={product.name} className="w-full" />
      </Link>
      <div className="w-1/3 flex flex-col gap-4">
        <Link to={to}>
          <span className="font-roboto text-gray-800 font-medium">
            {product.name}
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <Rating value={4.5} size="sm" />
          <span className="text-xs text-gray-500">(150 reviews)</span>
        </div>
      </div>
      <QuantityPicker
        value={product.quantity}
        onChange={(value) => updateQuantity(product.id, value)}
      />
      <div className="text-primary text-lg font-semibold">
        {formatPrice(product.price)}
      </div>
      <button onClick={() => deleteProduct(product.id)}>
        <span className="block w-6 text-gray-600 cursor-pointer hover:text-red-500">
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

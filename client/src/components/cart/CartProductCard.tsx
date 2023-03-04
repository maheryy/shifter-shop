import { Link } from "react-router-dom";
import { ProductWithQuantity } from "../../types/product";
import { formatPrice } from "../../utils/format";
import QuantityPicker from "../QuantityPicker";

const CartProductCard = ({
  product,
  updateQuantity,
  deleteProduct,
}: CartProductCardProps) => {
  return (
    <div className="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded">
      <div className="w-28">
        <img src={product.image} alt={product.name} className="w-full" />
      </div>
      <div className="w-1/3">
        <Link to={`/products/${product.id}`}>
          <span className="font-roboto text-gray-800 font-medium">
            {product.name}
          </span>
        </Link>
      </div>
      <QuantityPicker value={product.quantity} onChange={updateQuantity} />
      <div className="text-primary text-lg font-semibold">
        {formatPrice(product.price * product.quantity)}
      </div>
      <button onClick={deleteProduct}>
        <div className="text-gray-600 cursor-pointer hover:text-primary">
          {/* <i className="fa-solid fa-trash"></i> */}
          Delete
        </div>
      </button>
    </div>
  );
};

interface CartProductCardProps {
  product: ProductWithQuantity;
  updateQuantity: (quantity: number) => void;
  deleteProduct: () => void;
}

export default CartProductCard;

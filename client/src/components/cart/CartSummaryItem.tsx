import { ProductWithQuantity } from "../../types/product";
import { formatPrice } from "../../utils/format";

const CartSummaryItem = ({ product }: CartSummaryItemProps) => {
  return (
    <div className="grid grid-cols-12 gap-4 justify-center" key={product.id}>
      <span className="col-span-8 truncate pr-4 font-roboto text-sm text-gray-800 font-medium">
        {product.name}
      </span>
      <span className="col-span-1 text-gray-600 text-sm">x{product.quantity}</span>
      <span className="col-span-3 text-gray-800 text-sm font-medium text-right">
        {formatPrice(product.price)}
      </span>
    </div>
  );
};

interface CartSummaryItemProps {
  product: ProductWithQuantity;
}

export default CartSummaryItem;

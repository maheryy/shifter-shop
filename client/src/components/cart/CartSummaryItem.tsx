import { ProductWithQuantity } from "@/types/product";
import { formatPrice } from "@/utils/format";

const CartSummaryItem = ({ product }: CartSummaryItemProps) => {
  return (
    <div className="grid grid-cols-12 justify-center gap-4" key={product.id}>
      <span className="col-span-8 truncate pr-4 font-roboto text-sm font-medium text-gray-800">
        {product.name}
      </span>
      <span className="col-span-1 text-sm text-gray-600">
        x{product.quantity}
      </span>
      <span className="col-span-3 text-right text-sm font-medium text-gray-800">
        {formatPrice(product.price * product.quantity)}
      </span>
    </div>
  );
};

interface CartSummaryItemProps {
  product: ProductWithQuantity;
}

export default CartSummaryItem;

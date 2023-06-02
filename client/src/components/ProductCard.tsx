import { Link } from "react-router-dom";
import Rating from "@/components/Rating";
import { useCartContext } from "@/hooks/context";
import { Product } from "@/types/product";
import { formatPrice } from "@/utils/format";

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCartContext();

  const to = `/products/${product.id}`;

  return (
    <div className="group flex flex-col overflow-hidden rounded bg-white shadow">
      <Link to={to}>
        <img alt={product.name} className="h-64 w-full" src={product.image} />
      </Link>
      <div className="flex flex-1 flex-col justify-between px-4 pb-3 pt-4">
        <Link className="max-h-14 overflow-y-hidden" to={to}>
          <span className="mb-2 text-lg font-medium text-gray-800 transition hover:text-primary">
            {product.name}
          </span>
        </Link>
        <div>
          <div className="mb-1 flex items-baseline space-x-2">
            <p className="text-xl font-semibold text-primary">
              {formatPrice(product.price)}
            </p>
          </div>
          <div className="flex items-center">
            <Rating size="sm" value={5} />
            <span className="ml-2 text-xs text-gray-500">(150)</span>
          </div>
        </div>
      </div>
      <button
        className="block w-full rounded-b border border-primary bg-primary py-1 text-center text-white transition hover:bg-transparent hover:text-primary"
        onClick={() => addToCart(product)}
      >
        Add to cart
      </button>
    </div>
  );
};

interface ProductCardProps {
  product: Product;
}

export default ProductCard;

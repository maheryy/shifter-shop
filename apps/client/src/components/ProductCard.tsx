import { Link } from "react-router-dom";
import Rating from "@/components/Rating";
import useCart, { useQuantity } from "@/hooks/useCart";
import { TProduct } from "@/types/product";
import { formatPrice } from "@/utils/format";

interface ProductCardProps {
  product: TProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const to = `/products/${product.id}`;
  const { updateMutation } = useCart();
  const { data } = useQuantity(product.id);

  function onAddToCart() {
    updateMutation.mutate({
      product,
      quantity: data ? data + 1 : 1,
    });
  }

  const { name, image, price, rating, reviewCount } = product;

  return (
    <div className="group flex flex-col rounded bg-white shadow">
      <Link to={to}>
        <img alt={name} src={image} />
      </Link>
      <div className="flex flex-1 flex-col justify-between px-4 pb-3 pt-4">
        <Link className="max-h-14 overflow-y-hidden" to={to}>
          <span className="mb-2 text-lg font-medium text-gray-800 transition hover:text-primary">
            {name}
          </span>
        </Link>
        <div>
          <div className="mb-1 flex items-baseline space-x-2">
            <p className="text-xl font-semibold text-primary">
              {formatPrice(price)}
            </p>
          </div>
          <div className="flex items-center">
            <Rating size="sm" value={rating} />
            <span className="ml-2 text-xs text-gray-500">({reviewCount})</span>
          </div>
        </div>
      </div>
      <button
        className="block w-full rounded-b border border-primary bg-primary py-1 text-center text-white transition hover:bg-transparent hover:text-primary"
        onClick={onAddToCart}
      >
        Add to cart
      </button>
    </div>
  );
};

export default ProductCard;

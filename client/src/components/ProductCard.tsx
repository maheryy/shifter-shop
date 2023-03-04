import { Link } from "react-router-dom";
import { Product } from "../types/product";
import { formatPrice } from "../utils/format";
import Rating from "./Rating";

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="bg-white shadow rounded overflow-hidden group flex flex-col">
      <div>
        <img src={product.image} alt={product.name} className="w-full h-64" />
      </div>
      <div className="pt-4 pb-3 px-4 flex-1 flex flex-col justify-between">
        <Link
          to={`/products/${product.id}`}
          className="max-h-14 overflow-y-hidden"
        >
          <span className="font-medium text-lg mb-2 text-gray-800 hover:text-primary transition">
            {product.name}
          </span>
        </Link>
        <div>
          <div className="flex items-baseline mb-1 space-x-2">
            <p className="text-xl text-primary font-semibold">
              {formatPrice(product.price)}
            </p>
          </div>
          <div className="flex items-center">
            <Rating value={5} size="sm" />
            <span className="text-xs text-gray-500 ml-2">(150)</span>
          </div>
        </div>
      </div>
      <button className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition">
        Add to cart
      </button>
    </div>
  );
};

interface ProductCardProps {
  product: Product;
}

export default ProductCard;

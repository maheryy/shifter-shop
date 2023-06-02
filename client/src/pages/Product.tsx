import BagIcon from "@icons/bag.svg";
import { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { getRelatedProducts } from "@/api/product.api";
import ProductCard from "@/components/ProductCard";
import QuantityPicker from "@/components/QuantityPicker";
import Rating from "@/components/Rating";
import { useCartContext } from "@/hooks/context";
import { Product } from "@/types/product";
import { formatPrice } from "@/utils/format";

const Product = () => {
  const { id } = useParams();
  const product = useLoaderData() as Product;
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const { addToCart } = useCartContext();

  useEffect(() => {
    getRelatedProducts(Number(id))
      .then((products) => setRelatedProducts(products))
      .catch((err) => console.log(err));
  }, [product]);

  const productDetails = {
    color: null,
    material: null,
    weight: null,
  };

  return (
    <div className="container py-16">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <img alt={product.name} className="w-full" src={product.image} />
        </div>
        <div>
          <h1 className="mb-2 text-3xl font-medium uppercase">
            {product.name}
          </h1>
          <div className="mb-4 flex items-center">
            <Rating size="md" value={3.5} />
            <span className="ml-3 text-sm text-gray-500">(150 Reviews)</span>
          </div>
          <div className="space-y-2">
            <p className="space-x-2 font-semibold text-gray-800">
              <span>Availability: </span>
              <span className="text-green-600">In Stock</span>
            </p>
            <p className="space-x-2">
              <span className="font-semibold text-gray-800">Reference: </span>
              <span className="text-gray-600">798QZEZAD0</span>
            </p>
            <p className="space-x-2">
              <span className="font-semibold text-gray-800">Category: </span>
              <span className="text-gray-600">Health</span>
            </p>
          </div>
          <div className="mb-1 mt-8 flex items-baseline space-x-2 font-roboto">
            <p className="text-2xl font-semibold text-primary">
              {formatPrice(product.price)}
            </p>
          </div>
          <p className="mt-4 text-gray-600">
            {product.description.length > 450
              ? product.description.slice(0, 450) + "..."
              : product.description}
          </p>
          <div className="mt-4">
            <span className="text-sm font-semibold uppercase text-gray-800">
              Quantity
            </span>
            <div className="my-2">
              <QuantityPicker onChange={setQuantity} value={quantity} />
            </div>
          </div>
          <div className="mt-6 flex gap-3 py-5">
            <button
              className="relative flex items-center justify-center gap-2 rounded border border-primary bg-primary px-8 py-2 font-medium uppercase text-white transition hover:bg-transparent hover:text-primary"
              onClick={() => addToCart(product, quantity)}
            >
              <span className="relative bottom-0.5 block w-5">
                <BagIcon />
              </span>
              Add to cart
            </button>
          </div>
        </div>
      </div>
      <div className="pb-16">
        <h3 className="border-b border-gray-200 pb-3 pt-6 font-roboto font-medium text-gray-800">
          Product details
        </h3>
        <div className="w-3/5 pt-4">
          <div className="text-gray-600">{product.description}</div>
          {!!Object.keys(productDetails).length && (
            <table className="mt-6 w-full table-auto border-collapse text-left text-sm text-gray-600">
              <tbody>
                {Object.keys(productDetails).map((key) => (
                  <tr key={key}>
                    <th className="w-40 border border-gray-300 px-4 py-2 font-medium capitalize">
                      {key}
                    </th>
                    <th className="border border-gray-300 px-4 py-2 ">
                      {productDetails[key as keyof typeof productDetails] ||
                        "N/A"}
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <div className="pb-16">
        <h2 className="mb-6 text-2xl font-medium uppercase text-gray-800">
          Related products
        </h2>
        <div className="grid grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;

import BagIcon from "@icons/bag.svg";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct, getRelatedProducts } from "@/api/product.api";
import ProductCard from "@/components/ProductCard";
import QuantityPicker from "@/components/QuantityPicker";
import Rating from "@/components/Rating";
import { useCartContext } from "@/hooks/context";
import { useData } from "@/hooks/useData";
import { Loader } from "@/types/loader";
import { Product } from "@/types/product";
import { formatPrice } from "@/utils/format";

export const productLoader: Loader<Product> = ({ params }) =>
  getProduct(Number(params.id));

const Product = () => {
  const { id } = useParams();
  const product = useData<Product>();
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const { addToCart } = useCartContext();

  useEffect(() => {
    getRelatedProducts(Number(id))
      .then((products) => setRelatedProducts(products))
      .catch((err) => console.log(err));
  }, [id, product]);

  const productDetails = {
    color: null,
    material: null,
    weight: null,
  };

  return (
    <section className="container grid gap-16 py-16">
      <div className="grid gap-8 md:grid-cols-2">
        <img alt={product.name} src={product.image} />
        <div className="grid gap-4">
          <h1 className="text-3xl font-medium uppercase">{product.name}</h1>
          <div className="flex items-center gap-2">
            <Rating size="md" value={3.5} />
            <span className="text-sm text-gray-500">(150 Reviews)</span>
          </div>
          <div className="grid gap-2">
            <p className="flex gap-2 font-semibold text-gray-800">
              <span>Availability: </span>
              <span className="text-green-600">In Stock</span>
            </p>
            <p className="flex gap-2">
              <span className="font-semibold text-gray-800">Reference: </span>
              <span className="text-gray-600">798QZEZAD0</span>
            </p>
            <p className="flex gap-2">
              <span className="font-semibold text-gray-800">Category: </span>
              <span className="text-gray-600">Health</span>
            </p>
          </div>
          <p className="text-2xl font-semibold text-primary">
            {formatPrice(product.price)}
          </p>
          <p className="text-gray-600">
            {product.description.length > 450
              ? product.description.slice(0, 450) + "..."
              : product.description}
          </p>
          <div className="grid gap-2">
            <span className="text-sm font-semibold uppercase text-gray-800">
              Quantity
            </span>
            <QuantityPicker onChange={setQuantity} value={quantity} />
          </div>
          <button
            className="relative flex w-fit items-center justify-center gap-2 rounded border border-primary bg-primary px-8 py-2 font-medium uppercase text-white transition hover:bg-transparent hover:text-primary"
            onClick={() => addToCart(product, quantity)}
          >
            <span className="relative bottom-0.5 block w-5">
              <BagIcon />
            </span>
            Add to cart
          </button>
        </div>
      </div>
      <div className="grid gap-4">
        <h3 className="border-b border-gray-200 pb-2 font-roboto font-medium text-gray-800">
          Product details
        </h3>
        <div className="md:w-3/5">
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
      <div className="grid gap-4">
        <h2 className="text-2xl font-medium uppercase text-gray-800">
          Related products
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Product;

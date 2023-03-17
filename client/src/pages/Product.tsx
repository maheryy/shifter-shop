import { useParams, useLoaderData } from "react-router-dom";
import { Product } from "../types/product";
import { useEffect, useState } from "react";
import { getRelatedProducts } from "../api/product.api";
import ProductCard from "../components/ProductCard";
import { formatPrice } from "../utils/format";
import QuantityPicker from "../components/QuantityPicker";
import BagIcon from "../assets/icons/bag.svg";
import Rating from "../components/Rating";
import { useCartContext } from "../hooks/context";

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
          <img src={product.image} alt={product.name} className="w-full" />
        </div>

        <div>
          <h1 className="text-3xl font-medium uppercase mb-2">
            {product.name}
          </h1>
          <div className="flex items-center mb-4">
            <Rating value={3.5} size="md" />
            <span className="text-sm text-gray-500 ml-3">(150 Reviews)</span>
          </div>
          <div className="space-y-2">
            <p className="text-gray-800 font-semibold space-x-2">
              <span>Availability: </span>
              <span className="text-green-600">In Stock</span>
            </p>
            <p className="space-x-2">
              <span className="text-gray-800 font-semibold">Reference: </span>
              <span className="text-gray-600">798QZEZAD0</span>
            </p>
            <p className="space-x-2">
              <span className="text-gray-800 font-semibold">Category: </span>
              <span className="text-gray-600">Health</span>
            </p>
          </div>
          <div className="flex items-baseline mb-1 space-x-2 font-roboto mt-8">
            <p className="text-2xl text-primary font-semibold">
              {formatPrice(product.price)}
            </p>
          </div>

          <p className="mt-4 text-gray-600">
            {product.description.length > 450
              ? product.description.slice(0, 450) + "..."
              : product.description}
          </p>

          <div className="mt-4">
            <span className="text-sm text-gray-800 uppercase font-semibold">
              Quantity
            </span>
            <div className="my-2">
              <QuantityPicker value={quantity} onChange={setQuantity} />
            </div>
          </div>

          <div className="mt-6 flex gap-3 pb-5 pt-5">
            <button
              className="bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase flex justify-center items-center gap-2 hover:bg-transparent hover:text-primary transition relative"
              onClick={() => addToCart(product, quantity)}
            >
              <span className="block w-5 relative bottom-0.5">
                <BagIcon />
              </span>
              Add to cart
            </button>
          </div>
        </div>
      </div>

      <div className="pb-16">
        <h3 className="border-b border-gray-200 font-roboto text-gray-800 pt-6 pb-3 font-medium">
          Product details
        </h3>
        <div className="w-3/5 pt-4">
          <div className="text-gray-600">{product.description}</div>
          {!!Object.keys(productDetails).length && (
            <table className="table-auto border-collapse w-full text-left text-gray-600 text-sm mt-6">
              <tbody>
                {Object.keys(productDetails).map((key) => (
                  <tr key={key}>
                    <th className="py-2 px-4 border border-gray-300 w-40 font-medium capitalize">
                      {key}
                    </th>
                    <th className="py-2 px-4 border border-gray-300 ">
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
        <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
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

import BagIcon from "@icons/bag.svg";
import { useState } from "react";
import { getProduct } from "@/api/product.api";
import ProductCard from "@/components/ProductCard";
import QuantityPicker from "@/components/QuantityPicker";
import Rating from "@/components/Rating";
import useCart, { useQuantity } from "@/hooks/useCart";
import { useData } from "@/hooks/useData";
import { Loader } from "@/types/loader";
import type { TProduct } from "@/types/product";
import { formatPrice } from "@/utils/format";

interface ProductData {
  product: TProduct;
  relatedProducts: TProduct[];
}

export const productLoader: Loader<ProductData> = async ({ params }) => {
  if (!params.id) {
    throw new Error("Product id is required");
  }

  const [product, relatedProducts] = await Promise.all([
    getProduct(params.id),

    // TODO : implement related products
    // getRelatedProducts(Number(params.id)),
    [],
  ]);

  return {
    product,
    relatedProducts,
  };
};

function Product() {
  const { product, relatedProducts } = useData<ProductData>();
  const [quantity, setQuantity] = useState(1);
  const { updateMutation } = useCart();
  const { data } = useQuantity(product.id);

  function onAddToCart() {
    updateMutation.mutate({
      product,
      quantity: data ? data + quantity : quantity,
    });
  }

  // TODO: implement product details
  const productDetails = {
    color: null,
    material: null,
    weight: null,
  };

  const { id, name, image, price, description, rating, reviewCount } = product;

  return (
    <section className="container grid gap-16 py-16">
      <div className="grid gap-8 md:grid-cols-2">
        <img alt={name} src={image} />
        <div className="grid gap-4">
          <h1 className="text-3xl font-medium uppercase">{name}</h1>
          <div className="flex items-center gap-2">
            <Rating size="md" value={rating} />
            <span className="text-sm text-gray-500">({reviewCount})</span>
          </div>
          <div className="grid gap-2">
            <p className="flex gap-2 font-semibold text-gray-800">
              <span>Availability: </span>
              <span className="text-green-600">In Stock</span>
            </p>
            <p className="flex gap-2">
              <span className="font-semibold text-gray-800">Reference: </span>
              <span className="uppercase text-gray-600">
                {getReference(product.id)}
              </span>
            </p>
            <p className="flex gap-2">
              <span className="font-semibold text-gray-800">Category: </span>
              <span className="text-gray-600">{product.category.name}</span>
            </p>
            <p className="flex gap-2">
              <span className="font-semibold text-gray-800">Sold by:</span>
              <span className="text-gray-600">{product.seller.firstname}</span>
            </p>
          </div>
          <p className="text-2xl font-semibold text-primary">
            {formatPrice(price)}
          </p>
          <p className="text-gray-600">
            {description.length > 450
              ? description.slice(0, 450) + "..."
              : description}
          </p>
          <div className="grid gap-2">
            <span className="text-sm font-semibold uppercase text-gray-800">
              Quantity
            </span>
            <QuantityPicker onChange={setQuantity} value={quantity} />
          </div>
          <button
            className="relative flex w-fit items-center justify-center gap-2 rounded border border-primary bg-primary px-8 py-2 font-medium uppercase text-white transition hover:bg-transparent hover:text-primary"
            onClick={onAddToCart}
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
          <div className="text-gray-600">{description}</div>
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
            <ProductCard key={id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

function getReference(uuid: string) {
  const uuidWithoutHyphens = uuid.replace(/-/g, "").toLowerCase();

  const decimalNumber = parseInt(uuidWithoutHyphens, 16);

  const shortString = decimalNumber.toString(36);

  const result = shortString.substring(0, 10);

  return result;
}

export default Product;

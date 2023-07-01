import {
  TFullProduct
} from "@shifter-shop/dictionary";

const ModalProduct = ({ product }: ModalProductProps) => {
  return (
    <>
      {/* Modal title */}
      <p className="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
        {product.name}
      </p>
      {/* Modal description */}
      <p className="text-sm text-gray-700 dark:text-gray-400">
        {product.description}
      </p>
      {/* Modal image */}
      <img className="mt-4 rounded-lg" src={product.image} alt={product.name} />
      {/* Modal price */}
      <p className="mt-2 text-lg font-semibold text-gray-800 dark:text-white">
        Price: ${product.price}
      </p>
      {/* Modal category */}
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
        Category: {product.category.name}
      </p>
      {/* Modal seller */}
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
        Seller: {product.seller.firstname}
      </p>
      {/* Modal status */}
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
        Status: {product.status}
      </p>
    </>
  );
}

interface ModalProductProps {
  product: TFullProduct;
}

export default ModalProduct;
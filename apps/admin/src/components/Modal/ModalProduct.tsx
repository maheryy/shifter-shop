import {
  TFullProduct
} from "@shifter-shop/dictionary/dist/types/product";

const ModalProduct = ({ product }: ModalProductProps) => {
  return (
    <>
      {/* Modal title */}
      <p className="mb-4 text-2xl font-bold text-gray-700 dark:text-gray-300">
        {product.name}
      </p>
      <div className="flex flex-col md:flex-row mb-4">
        {/* Modal image */}
        <div className="w-full md:w-3/5 mb-4 md:mb-0">
          <img className="object-contain w-full rounded-lg" src={product.image} alt={product.name} />
        </div>
        <div className="w-full md:w-2/5 md:ml-4">
          <div className="flex flex-col mb-10">
            {/* Modal price */}
            <p className="mt-2 text-lg font-semibold text-gray-800 dark:text-white">
              Price: ${product.price}
            </p>
          </div>
          {/* Modal category */}
          <p className="mt-1 text-base text-gray-600 dark:text-gray-400">
            Category: {product.category.name}
          </p>
          {/* Modal seller */}
          <p className="mt-1 text-base text-gray-600 dark:text-gray-400">
            Seller: {product.seller.firstname} {product.seller.lastname}
          </p>
          {/* Modal status */}
          <p className="mt-1 text-base text-gray-600 dark:text-gray-400">
            Status: {product.status}
          </p>
        </div>
      </div>
      {/* Modal description */}
      <p className="text-base text-gray-700 dark:text-gray-400">
        {product.description}
      </p>
    </>
  );
}

interface ModalProductProps {
  product: TFullProduct;
}

export default ModalProduct;
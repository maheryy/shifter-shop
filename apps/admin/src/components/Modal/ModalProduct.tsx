const ModalProduct = ({ title, description, image, price, category, seller, status }: ModalProductProps) => {
    return (
        <>
            {/* Modal title */}
            <p className="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                {title}
            </p>
            {/* Modal description */}
            <p className="text-sm text-gray-700 dark:text-gray-400">
                {description}
            </p>
            {/* Modal image */}
            <img className="mt-4 rounded-lg" src={image} alt={title} />
            {/* Modal price */}
            <p className="mt-2 text-lg font-semibold text-gray-800 dark:text-white">
                Price: ${price}
            </p>
            {/* Modal category */}
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Category: {category}
            </p>
            {/* Modal seller */}
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Seller: {seller}
            </p>
            {/* Modal status */}
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Status: {status}
            </p>
        </>
    );
}

interface ModalProductProps {
    title: string;
    description: string;
    image: string;
    price: number;
    category: string;
    seller: string;
    status: string;
}

export default ModalProduct;
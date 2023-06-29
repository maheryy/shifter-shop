import {
  TFullOrder
} from "@shifter-shop/dictionary";

const ModalOrder = ({ order }: ModalOrderProps) => {
  return (
    <>
      {/* Modal reference */}
      <p className="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
        {order.reference}
      </p>
      {/* Modal amount */}
      <p className="text-sm text-gray-700 dark:text-gray-400">
        {order.amount}
      </p>
      {/* Modal customer */}
      <p className="text-sm text-gray-700 dark:text-gray-400">
        {order.customer.firstname} {order.customer.lastname}
      </p>
      {/* Modal status */}
      <p className="text-sm text-gray-700 dark:text-gray-400">
        {order.status}
      </p>
      {/* Modal date */}
      <p className="text-sm text-gray-700 dark:text-gray-400">
        {order.date.toDateString()}
      </p>
      {/* Modal products */}
      <p className="text-sm text-gray-700 dark:text-gray-400">
        {order.products.map((product, index) => (
          <div key={index}>
            <p className="text-sm text-gray-700 dark:text-gray-400">
              {product.name}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-400">
              {product.price}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-400">
              {product.quantity}
            </p>
          </div>
        ))}
      </p>
    </>
  );
}

interface ModalOrderProps {
  order: TFullOrder;
}

export default ModalOrder;
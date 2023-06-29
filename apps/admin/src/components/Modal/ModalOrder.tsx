import {
  TFullOrder
} from "@shifter-shop/dictionary";

const ModalOrder = ({ order }: ModalOrderProps) => {
  let date = new Date(order.date);

  return (
    <>
      {/* Modal reference */}
      <p className="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
        Product n°{order.reference}
      </p>
      {/* Modal amount */}
      <p className="text-sm text-gray-700 dark:text-gray-400">
        Amount: ${order.amount}
      </p>
      {/* Modal customer */}
      <p className="text-sm text-gray-700 dark:text-gray-400">
        Ordered by {order.customer.firstname} {order.customer.lastname}
      </p>
      {/* Modal status */}
      <p className="text-sm text-gray-700 dark:text-gray-400">
        Status: {order.status}
      </p>
      {/* Modal date */}
      <p className="text-sm text-gray-700 dark:text-gray-400">
        Order placed on {date.toLocaleDateString()} at {date.toLocaleTimeString()}
      </p>
      {/* Modal products */}
      <p className="text-sm text-gray-700 dark:text-gray-400">
        <span className="font-semibold">Products:</span>
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
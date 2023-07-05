import {
  TFullOrder
} from "@shifter-shop/dictionary";

const ModalOrder = ({ order }: ModalOrderProps) => {
  let date = new Date(order.date);

  return (
    <>
      {/* Modal reference */}
      <p className="text-2xl font-bold mb-4 text-gray-700 dark:text-gray-300">
        Order Details #{order.reference}
      </p>
      {/* Modal Infos */}
      <div className="mb-6 text-lg text-gray-700 dark:text-gray-400">
        <p><strong>Amount:</strong> $ {order.amount}</p>
        <p><strong>Ordered by:</strong> {order.customer.firstname} {order.customer.lastname}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Order placed on:</strong> {date.toLocaleDateString()} at {date.toLocaleTimeString()}</p>
      </div>
      {/* Modal products */}
      <div className="border-t-4 text-gray-700 dark:text-gray-400">
        <span className="pt-6 text-lg font-bold text-gray-700 dark:text-gray-300">Products:</span>
        <ul className="mt-2">
          {order.products.map((product, index) => (
            <li key={index} className="mb-4">
              <div className="grid grid-cols-10">
                <div className="col-span-1">
                  <p className="text-base text-gray-700 dark:text-gray-400">
                    <strong>{index + 1}. </strong>
                  </p>
                </div>
                <div className="col-span-9">
                  <p className="text-base text-gray-700 dark:text-gray-400">
                    <strong> {product.name}</strong>
                  </p>
                  <p className="text-base text-gray-700 dark:text-gray-400">
                    <strong>Price:</strong> $ {product.price}
                  </p>
                  <p className="text-base text-gray-700 dark:text-gray-400">
                    <strong>Quantity:</strong>{product.quantity}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

interface ModalOrderProps {
  order: TFullOrder;
}

export default ModalOrder;
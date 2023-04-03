import { Order } from "../../types/order";
import { formatDisplayDate, formatPrice } from "../../utils/format";
import OrderProductCard from "./OrderProductCard";
import { generateInvoiceFilename } from "../../utils/generator";
import DropdownMenu from "../DropdownMenu";
import DownloadIcon from "../../assets/icons/download.svg";
import { useDownloadContext } from "../../hooks/context";

const OrderCard = ({ order }: OrderCardProps) => {
  const { download, isLoading: isDownloading } = useDownloadContext();

  const downloadInvoice = () =>
    download(`http://localhost:3000/invoice/${order.reference}`, {
      filename: generateInvoiceFilename(order),
    });

  return (
    <div className="border border-gray-200 rounded">
      <div className="bg-gray-50 py-3 px-6 border-b border-gray-200 rounded-t grid grid-cols-10 gap-4 text-gray-600 text-sm">
        <div className="col-span-3 flex flex-col">
          <span className="uppercase font-medium">
            Order #{order.reference}
          </span>
          <span>{formatDisplayDate(order.date)}</span>
        </div>
        <div className="col-span-3 flex flex-col">
          <span className="uppercase font-medium">Status</span>
          <span className="capitalize">{order.status}</span>
        </div>
        <div className="col-span-4 justify-end flex">
          <div className="flex flex-col items-end">
            <span className="uppercase font-medium">Total</span>
            <span>{formatPrice(order.totalAmount)}</span>
          </div>
          <div className="flex items-center relative left-4">
            <DropdownMenu>
              <button
                className="px-6 py-2 text-gray-700 w-full bg-none transition duration-100 text-xs text-left gap-2 flex items-center hover:bg-gray-100 disabled:cursor-wait disabled:text-gray-300"
                onClick={downloadInvoice}
                disabled={isDownloading}
              >
                <span className="block w-4 h-4">
                  <DownloadIcon />
                </span>
                Download invoice
              </button>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-b">
        <div className="flex flex-col divide-y-[1px] divide-gray-200">
          {order.products.map((product) => (
            <OrderProductCard
              key={`${order.reference}_${product.id}`}
              product={product}
              orderId={order.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface OrderCardProps {
  order: Order;
}

export default OrderCard;

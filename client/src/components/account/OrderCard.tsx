import DownloadIcon from "@icons/download.svg";
import OrderProductCard from "@/components/account/OrderProductCard";
import DropdownMenu from "@/components/DropdownMenu";
import { useDownloadContext } from "@/hooks/context";
import { Order } from "@/types/order";
import { formatDisplayDate, formatPrice } from "@/utils/format";
import { generateInvoiceFilename } from "@/utils/generator";

const OrderCard = ({ order }: OrderCardProps) => {
  const { download, isLoading: isDownloading } = useDownloadContext();

  const downloadInvoice = () =>
    download(`${import.meta.env.VITE_API_URL}/invoice/${order.reference}`, {
      filename: generateInvoiceFilename(order),
    });

  return (
    <div className="rounded border border-gray-200">
      <div className="grid grid-cols-10 gap-4 rounded-t border-b border-gray-200 bg-gray-50 px-6 py-3 text-sm text-gray-600">
        <div className="col-span-3 flex flex-col">
          <span className="font-medium uppercase">
            Order #{order.reference}
          </span>
          <span>{formatDisplayDate(order.date)}</span>
        </div>
        <div className="col-span-3 flex flex-col">
          <span className="font-medium uppercase">Status</span>
          <span className="capitalize">{order.status}</span>
        </div>
        <div className="col-span-4 flex justify-end">
          <div className="flex flex-col items-end">
            <span className="font-medium uppercase">Total</span>
            <span>{formatPrice(order.totalAmount)}</span>
          </div>
          <div className="relative left-4 flex items-center">
            <DropdownMenu>
              <button
                className="flex w-full items-center gap-2 bg-none px-6 py-2 text-left text-xs text-gray-700 transition duration-100 hover:bg-gray-100 disabled:cursor-wait disabled:text-gray-300"
                disabled={isDownloading}
                onClick={downloadInvoice}
              >
                <span className="block h-4 w-4">
                  <DownloadIcon />
                </span>
                Download invoice
              </button>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div className="rounded-b bg-white">
        <div className="flex flex-col divide-y-[1px] divide-gray-200">
          {order.products.map((product) => (
            <OrderProductCard
              key={`${order.reference}_${product.id}`}
              orderId={order.id}
              product={product}
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

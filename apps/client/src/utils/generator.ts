import { Order } from "@/types/order";
import { formatDisplayShortDate } from "@/utils/format";

export const generateInvoiceFilename = ({ reference, date }: Order) => {
  return `invoice-${reference}-${formatDisplayShortDate(date).replaceAll(
    "/",
    "_",
  )}.pdf`;
};

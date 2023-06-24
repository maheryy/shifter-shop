import { NextFunction, Request, Response } from "express";
import { getInvoiceContent, getOrder } from "services/invoice.service";

export const generateInvoice = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { reference } = req.params;

  try {
    const order = await getOrder(reference);
    const invoice = await getInvoiceContent(order);
    const filename = `invoice_${reference}`;

    return res
      .status(200)
      .setHeader("Content-Type", "application/pdf")
      .setHeader(
        "Content-Disposition",
        `attachment; filename="${filename}.pdf"`
      )
      .send(invoice);
  } catch (error) {
    next(error);
  }
};

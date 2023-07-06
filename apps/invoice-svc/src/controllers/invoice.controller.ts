import { UnauthorizedError } from "@shifter-shop/errors";
import { NextFunction, Request, Response } from "express";
import { getInvoiceContent, getOrder } from "services/invoice.service";

export const generateInvoice = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.get("user-id");
    if (!userId) {
      throw new UnauthorizedError(
        "You must be authenticated to access this resource"
      );
    }

    const { reference } = req.params;
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

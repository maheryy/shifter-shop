import { Request, Response } from "express";
import { getInvoiceContent, getOrder } from "services/invoice.service";

export const generateInvoice = async (req: Request, res: Response) => {
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
  } catch (err) {
    console.error((err as Error).message);
    if (err instanceof ReferenceError) {
      return res.status(404).send({
        error: { code: 404, message: (err as Error).message },
      });
    }
    return res.status(500).send({
      error: { code: 500, message: "Unable to generate invoice" },
    });
  }
};

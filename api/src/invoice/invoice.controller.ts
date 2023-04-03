import {
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';

@Controller('invoice')
export class InvoiceController {
  constructor(private invoiceService: InvoiceService) {}

  @Get(':reference')
  async getInvoice(
    @Param('reference') reference: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    try {
      const reference = '5EM1ONEY6I';
      const filename = `invoice_${reference}`;
      const invoice = await this.invoiceService.generateInvoice(reference);

      return new StreamableFile(invoice, {
        disposition: `attachment; filename="${filename}.pdf"`,
        type: 'application/pdf',
      });
    } catch (err) {
      console.log((err as Error).message);
      if (err instanceof NotFoundException) {
        throw err;
      }
      throw new InternalServerErrorException(
        `Error while generating the invoice : ${err.message}}`,
      );
    }
  }
}

import { Module } from '@nestjs/common';
import { InvoiceService } from 'src/invoice/invoice.service';
import { InvoiceController } from 'src/invoice/invoice.controller';

@Module({
  providers: [InvoiceService],
  controllers: [InvoiceController],
})
export class InvoiceModule {}

import { Injectable, NotFoundException } from '@nestjs/common';
import { HelperService } from '../helper/helper.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InvoiceService {
  constructor(
    private prismaService: PrismaService,
    private helperService: HelperService,
  ) {}

  async generateInvoice(reference: string): Promise<Buffer> {
    const order = await this.prismaService.order.findUnique({
      where: { reference },
      include: {
        customer: { include: { profile: true } },
        products: { include: { product: true } },
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const template = await this.helperService.getHandlebarsTemplate(
      'src/invoice/templates/invoice.hbs',
      { name: 'Test' },
    );

    return this.helperService.generatePDF(template);
  }
}

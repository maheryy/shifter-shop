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
    /* temporary fetch random order */
    const order = await this.prismaService.order.findFirst({
      include: {
        customer: { include: { profile: true } },
        products: { include: { product: true } },
      },
    });

    // Working code here
    // const order = await this.prismaService.order.findUnique({
    //   where: { reference },
    //   include: {
    //     customer: { include: { profile: true } },
    //     products: { include: { product: true } },
    //   },
    // });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const template = await this.helperService.getHandlebarsTemplate(
      'src/invoice/templates/invoice.hbs',
      { order: order },
    );

    return this.helperService.generatePDF(template);
  }
}

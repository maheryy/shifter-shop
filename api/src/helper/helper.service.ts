import { Injectable } from '@nestjs/common';
import { Order } from '@prisma/client';
import {
  CustomerProduct,
  ProductWithQuantity,
} from 'src/common/interfaces/product';
import { PrismaService } from '../prisma/prisma.service';
import puppeteer from 'puppeteer';
import { readFile } from 'fs/promises';
import { compile } from 'handlebars';

@Injectable()
export class HelperService {
  constructor(private prismaService: PrismaService) {}

  generateReference(length: number) {
    return Math.random()
      .toString(36)
      .substring(2, 2 + length)
      .toUpperCase();
  }

  async generateOrderReference() {
    let reference: string;
    let order: Order | null;

    do {
      reference = this.generateReference(10);
      order = await this.prismaService.order.findUnique({
        where: { reference },
      });
    } while (order);

    return reference;
  }

  getProductsWithQuantity(products: CustomerProduct[]): ProductWithQuantity[] {
    return products.map(
      (item) =>
        ({ ...item.product, quantity: item.quantity } as ProductWithQuantity),
    );
  }

  async getHandlebarsTemplate(
    path: string,
    context?: Record<string, unknown>,
  ): Promise<string> {
    if (!path.includes('.hbs')) {
      throw new Error('Invalid template');
    }
    const template = await readFile(path, { encoding: 'utf-8' });
    return compile(template)(context);
  }

  async generatePDF(content: string): Promise<Buffer> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(content, { waitUntil: 'domcontentloaded' });
    const pdf = await page.pdf({
      margin: { top: '50px', right: '50px', bottom: '50px', left: '50px' },
      printBackground: true,
      format: 'A4',
    });
    await browser.close();

    return pdf;
  }
}

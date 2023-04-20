import { Injectable } from '@nestjs/common';
import { Order } from '@prisma/client';
import {
  CustomerProduct,
  ProductWithQuantity,
} from 'src/common/interfaces/product';
import { PrismaService } from 'src/prisma/prisma.service';
import puppeteer from 'puppeteer';
import { readFile } from 'fs/promises';
import Handlebars from 'handlebars';
import { resolve } from 'path';

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

  formatPrice(price: number) {
    return price.toLocaleString('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    });
  }

  formatDisplayDate(date: string | Date) {
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  formatDisplayShortDate(date: string | Date) {
    return new Date(date).toLocaleString('fr-FR', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
  }

  async getHandlebarsTemplate(
    filename: string,
    context?: Record<string, unknown>,
  ): Promise<string> {
    if (!filename.includes('.hbs')) {
      throw new Error('Invalid template');
    }
    const template = await readFile(
      resolve(__dirname, '..', 'assets/templates', filename),
      { encoding: 'utf-8' },
    );

    Handlebars.registerHelper('formatPrice', this.formatPrice);
    Handlebars.registerHelper('formatDate', this.formatDisplayShortDate);

    return Handlebars.compile(template)(context);
  }

  async generatePDF(content: string): Promise<Buffer> {
    const browser = await puppeteer.launch({
      headless: true,
      ...(process.env.APP_ENV === 'production'
        ? {
            executablePath: '/usr/bin/google-chrome',
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
          }
        : {}),
    });
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

import { Injectable } from '@nestjs/common';
import {
  ISendMailOptions,
  MailerService as NestMailerService,
} from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { HelperService } from '../helper/helper.service';
import { FullOrder } from 'src/stripe/interfaces/stripe.interface';

@Injectable()
export class MailerService {
  private host: string;

  constructor(
    private mailerService: NestMailerService,
    private configService: ConfigService,
    private helperService: HelperService,
  ) {
    this.host = this.configService.getOrThrow<string>('clientHost');
  }

  private async sendMail(
    to: string,
    subject: string,
    template: { name: string; context: Record<string, unknown> },
    attachments?: ISendMailOptions['attachments'],
  ) {
    try {
      await this.mailerService.sendMail({
        to,
        subject,
        template: `./${template.name}`,
        context: template.context,
        attachments,
      });
    } catch (error) {
      console.error('Fail to send email : ', (error as Error).message);
    }
  }

  async sendOrderConfirmation(order: FullOrder) {
    const template = await this.helperService.getHandlebarsTemplate(
      'src/invoice/templates/invoice.hbs',
      { order: order },
    );

    const invoice = await this.helperService.generatePDF(template);

    return this.sendMail(
      order.customer.email,
      'Order Confirmation',
      {
        name: 'order-confirmation',
        context: { name: order.customer.firstname, reference: order.reference },
      },
      [
        {
          filename: 'invoice.pdf',
          content: invoice,
        },
      ],
    );
  }
}

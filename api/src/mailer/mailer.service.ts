import { Injectable } from '@nestjs/common';
import {
  ISendMailOptions,
  MailerService as NestMailerService,
} from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { HelperService } from 'src/helper/helper.service';
import { FullOrder } from 'src/stripe/interfaces/stripe.interface';

@Injectable()
export class MailerService {
  private clientUrl: string;

  constructor(
    private mailerService: NestMailerService,
    private configService: ConfigService,
    private helperService: HelperService,
  ) {
    this.clientUrl = this.configService.getOrThrow<string>('clientUrl');
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
      'invoice.hbs',
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

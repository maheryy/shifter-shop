import { Injectable } from '@nestjs/common';
import { MailerService as NestMailerService } from '@nestjs-modules/mailer';
import { User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailerService {
  private host: string;

  constructor(
    private mailerService: NestMailerService,
    private configService: ConfigService,
  ) {
    this.host = this.configService.getOrThrow<string>('clientHost');
  }

  private async sendMail(
    to: string,
    subject: string,
    template: { name: string; context: Record<string, unknown> },
  ) {
    try {
      await this.mailerService.sendMail({
        to,
        subject,
        template: `./${template.name}`,
        context: template.context,
      });
    } catch (error) {
      console.error('Fail to send email : ', (error as Error).message);
    }
  }

  async sendOrderConfirmation(user: User, orderReference: string) {
    return this.sendMail(user.email, 'Order Confirmation', {
      name: 'order-confirmation',
      context: { name: user.firstname, reference: orderReference },
    });
  }
}

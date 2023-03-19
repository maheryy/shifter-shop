import { Injectable } from '@nestjs/common';
import { MailerService as NestMailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailerService {
  constructor(private mailerService: NestMailerService) {}

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

  async sendHelloWorld(to: string, testValue: string) {
    return this.sendMail(to, 'Hello World', {
      name: 'helloworld',
      context: { testValue },
    });
  }
}

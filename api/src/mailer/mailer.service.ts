import { Injectable } from '@nestjs/common';
import { MailerService as NestMailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailerService {
  constructor(private mailerService: NestMailerService) {}

  private sendMail(
    to: string,
    subject: string,
    template: { name: string; context: Record<string, unknown> },
  ) {
    return this.mailerService.sendMail({
      to,
      subject,
      template: `./${template.name}`,
      context: template.context,
    });
  }

  async sendHelloWorld(to: string, testValue: string) {
    return this.sendMail(to, 'Hello World', {
      name: 'helloworld',
      context: { testValue },
    });
  }
}

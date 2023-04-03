import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { MailerModule } from './mailer/mailer.module';
import { ConfigModule } from '@nestjs/config';
import stripeConfig from './config/stripe.config';
import appConfig from './config/app.config';
import { StripeModule } from './stripe/stripe.module';
import { HelperModule } from './helper/helper.module';
import { InvoiceModule } from './invoice/invoice.module';

@Module({
  imports: [
    PrismaModule,
    MailerModule,
    StripeModule,
    HelperModule,
    InvoiceModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, stripeConfig],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MailerModule } from 'src/mailer/mailer.module';
import { ConfigModule } from '@nestjs/config';
import stripeConfig from 'src/config/stripe.config';
import appConfig from 'src/config/app.config';
import { StripeModule } from 'src/stripe/stripe.module';
import { HelperModule } from 'src/helper/helper.module';
import { InvoiceModule } from 'src/invoice/invoice.module';
import { EncryptionModule } from 'src/encryption/encryption.module';
import { AuthModule } from 'src/auth/auth.module';

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
    EncryptionModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

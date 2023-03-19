import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { MailerModule } from './mailer/mailer.module';
import { ConfigModule } from '@nestjs/config';
import stripeConfig from './config/stripe.config';
import appConfig from './config/app.config';

@Module({
  imports: [
    PrismaModule,
    MailerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, stripeConfig],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { StripeService } from 'src/stripe/stripe.service';
import { StripeController } from 'src/stripe/stripe.controller';

@Module({
  providers: [StripeService],
  controllers: [StripeController],
})
export class StripeModule {}

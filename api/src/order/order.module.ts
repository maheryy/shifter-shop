import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OrderController } from './order.controller';

@Module({
  imports: [PrismaModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}

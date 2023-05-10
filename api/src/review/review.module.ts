import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ReviewController } from './review.controller';

@Module({
  imports: [PrismaModule],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}

import { Module } from '@nestjs/common';
import { BusinessService } from './business.service';
import { BusinessController } from './business.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessProfile } from './entities/business-profile.entity';
import { BusinessRequest } from './entities/business-request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BusinessProfile, BusinessRequest])],
  controllers: [BusinessController],
  providers: [BusinessService],
})
export class BusinessModule {}

import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { CustomerService } from 'src/customer/customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { CustomerModule } from 'src/customer/customer.module';

@Module({
  imports: [TypeOrmModule.forFeature([Address]), CustomerModule],
  controllers: [AddressController],
  providers: [AddressService, CustomerService],
})
export class AddressModule {}

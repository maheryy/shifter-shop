import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  UnauthorizedException,
  HttpCode,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { CustomerService } from 'src/customer/customer.service';
import { EUserRole } from '@shifter-shop/dictionary';
import { CustomerProfile } from 'src/customer/entities/customer-profile.entity';
import { Address } from './entities/address.entity';

@Controller('/addresses')
export class AddressController {
  constructor(
    private readonly addressService: AddressService,
    private readonly customerService: CustomerService,
  ) {}

  @Post()
  async create(
    @Headers('user-id') userId: string,
    @Body() createAddressDto: CreateAddressDto,
  ) {
    if (!userId) {
      throw new UnauthorizedException(
        'You must be authenticated to access this resource',
      );
    }

    const profile = await this.customerService.findById(userId);

    return this.addressService.create({ ...createAddressDto, profile });
  }

  @Get()
  findAll(
    @Headers('user-id') userId: string,
    @Headers('user-role') userRole: EUserRole,
  ) {
    if (!userId) {
      throw new UnauthorizedException(
        'You must be authenticated to access this resource',
      );
    }

    if (userRole !== EUserRole.Admin) {
      return this.addressService.findByProfile(userId);
    }

    return this.addressService.findAll();
  }

  @Get(':id')
  findOne(
    @Headers('user-id') userId: CustomerProfile['id'],
    @Param('id') id: Address['id'],
  ) {
    if (!userId) {
      throw new UnauthorizedException(
        'You must be authenticated to access this resource',
      );
    }

    return this.addressService.findOneById(userId, id);
  }

  @Patch(':id')
  update(
    @Headers('user-id') userId: CustomerProfile['id'],
    @Param('id') id: Address['id'],
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    if (!userId) {
      throw new UnauthorizedException(
        'You must be authenticated to access this resource',
      );
    }

    return this.addressService.update(userId, id, updateAddressDto);
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(
    @Headers('user-id') userId: CustomerProfile['id'],
    @Param('id') id: Address['id'],
  ) {
    if (!userId) {
      throw new UnauthorizedException(
        'You must be authenticated to access this resource',
      );
    }

    return this.addressService.remove(userId, id);
  }

  @HttpCode(204)
  @Post('/set-default/:id')
  async setDefault(
    @Headers('user-id') userId: CustomerProfile['id'],
    @Param('id') id: Address['id'],
  ) {
    if (!userId) {
      throw new UnauthorizedException(
        'You must be authenticated to access this resource',
      );
    }

    return this.addressService.setDefault(userId, id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  HttpCode,
} from '@nestjs/common';
import { Auth } from '@shifter-shop/nest';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { CustomerService } from 'src/customer/customer.service';
import { EUserRole } from '@shifter-shop/dictionary';
import { CustomerProfile } from 'src/customer/entities/customer-profile.entity';
import { ParamsDto } from './dto/params.dto';

@Auth()
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
    const profile = await this.customerService.findById(userId);

    return this.addressService.create({ ...createAddressDto, profile });
  }

  @Get()
  findAll(
    @Headers('user-id') userId: string,
    @Headers('user-role') userRole: EUserRole,
  ) {
    if (userRole !== EUserRole.Admin) {
      return this.addressService.findByProfile(userId);
    }

    return this.addressService.findAll();
  }

  @Get(':id')
  findOne(
    @Headers('user-id') userId: CustomerProfile['userId'],
    @Param() { id }: ParamsDto,
  ) {
    return this.addressService.findOneById(userId, id);
  }

  @Patch(':id')
  update(
    @Headers('user-id') userId: CustomerProfile['userId'],
    @Param() { id }: ParamsDto,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    return this.addressService.update(userId, id, updateAddressDto);
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(
    @Headers('user-id') userId: CustomerProfile['userId'],
    @Param() { id }: ParamsDto,
  ) {
    return this.addressService.remove(userId, id);
  }

  @HttpCode(204)
  @Post('/set-default/:id')
  async setDefault(
    @Headers('user-id') userId: CustomerProfile['userId'],
    @Param() { id }: ParamsDto,
  ) {
    return this.addressService.setDefault(userId, id);
  }
}

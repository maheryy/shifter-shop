import {
  Controller,
  Body,
  Get,
  Patch,
  Headers,
  HttpCode,
  Post,
} from '@nestjs/common';
import { UpdateProfileDto } from 'src/business/dtos/update-profile.dto';
import { BusinessService } from './business.service';
import { CreateBusinessRequestDto } from './dtos/create-business-request.dto';
import { Auth } from '@shifter-shop/nest';
import { CreateBusinessProfileDto } from './dtos/create-business-profile.dto';

@Auth()
@Controller('/business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Post('/')
  async createBusinessProfile(
    @Headers('user-id') userId: string,
    @Body() data: CreateBusinessProfileDto,
  ) {
    return this.businessService.create(userId, data);
  }

  @Get()
  async findBusinessProfile(@Headers('user-id') userId: string) {
    return this.businessService.findById(userId);
  }

  @Patch()
  @HttpCode(204)
  async updateBusinessProfile(
    @Headers('user-id') userId: string,
    @Body() data: UpdateProfileDto,
  ) {
    return this.businessService.update(userId, data);
  }

  @Post('/register')
  async register(
    @Headers('user-id') userId: string,
    @Body() data: CreateBusinessRequestDto,
  ) {
    return this.businessService.createBusinessRequest(userId, data);
  }
}

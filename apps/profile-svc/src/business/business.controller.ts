import {
  Controller,
  Body,
  Get,
  Patch,
  Headers,
  HttpCode,
  Post,
  UnauthorizedException,
  Param,
  Query,
} from '@nestjs/common';
import { UpdateProfileDto } from 'src/business/dtos/update-profile.dto';
import { BusinessService } from './business.service';
import { CreateBusinessRequestDto } from './dtos/create-business-request.dto';
import { Auth } from '@shifter-shop/nest';
import { CreateBusinessProfileDto } from './dtos/create-business-profile.dto';
import { EUserRole } from '@shifter-shop/dictionary';
import { UpdateBusinessRequestDto } from './dtos/update-request';

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

  @Get('/requests')
  async findBusinessRequests(@Query() { status }: UpdateBusinessRequestDto) {
    if (status) {
      return this.businessService.findBusinessRequests(status);
    }
    return this.businessService.findBusinessRequests();
  }

  @Patch()
  @HttpCode(204)
  async updateBusinessProfile(
    @Headers('user-id') userId: string,
    @Body() data: UpdateProfileDto,
  ) {
    return this.businessService.update(userId, data);
  }

  @Patch('/:id')
  @HttpCode(204)
  async updateBusinessStatus(
    @Headers('user-id') userId: string,
    @Headers('user-role') userRole: EUserRole,
    @Body() data: UpdateBusinessRequestDto,
    @Param() { id }: { id: string },
  ) {
    if (!userId && userRole !== EUserRole.Admin) {
      throw new UnauthorizedException();
    }

    return this.businessService.updateBusinessRequestStatus(id, data, userRole);
  }

  @Post('/register')
  async register(
    @Headers('user-id') userId: string,
    @Body() data: CreateBusinessRequestDto,
  ) {
    return this.businessService.createBusinessRequest(userId, data);
  }
}

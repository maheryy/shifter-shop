import {
  Controller,
  Body,
  Get,
  Patch,
  Headers,
  UnauthorizedException,
  HttpCode,
  Post,
} from '@nestjs/common';
import { UpdateProfileDto } from 'src/business/dtos/update-profile.dto';
import { BusinessService } from './business.service';
import { CreateBusinessRequestDto } from './dtos/create-business-request.dto';

@Controller()
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Get('/business')
  async findBusinessProfile(@Headers('user-id') userId: string) {
    if (!userId) {
      throw new UnauthorizedException(
        'You must be authenticated to access this resource',
      );
    }

    return this.businessService.findById(userId);
  }

  @Patch('/business')
  @HttpCode(204)
  async updateBusinessProfile(
    @Headers('user-id') userId: string,
    @Body() data: UpdateProfileDto,
  ) {
    if (!userId) {
      throw new UnauthorizedException(
        'You must be authenticated to access this resource',
      );
    }
    return this.businessService.update(userId, data);
  }

  @Post('/business/register')
  async register(
    @Headers('user-id') userId: string,
    @Body() data: CreateBusinessRequestDto,
  ) {
    if (!userId) {
      throw new UnauthorizedException(
        'You must be authenticated to access this resource',
      );
    }

    return this.businessService.createBusinessRequest(userId, data);
  }
}

import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { RequestUser } from 'src/decorators/request-user.decorator';
import { AuthService } from 'src/auth/auth.service';
import { LoginDto } from 'src/auth/dtos/login.dto';
import { RegisterDto } from 'src/auth/dtos/register.dto';
import { RemovePassword } from 'src/decorators/remove-password.decorator';
import { Public } from 'src/auth/guards/allow.public.guard';

@RemovePassword()
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  authenticate(@RequestUser() user: User) {
    return user;
  }

  @Public()
  @Post('auth/register')
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.authService.register(registerDto);
    const token = this.authService.getToken(user.id);

    return {
      token,
    };
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('auth/login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.login(loginDto);
    const token = this.authService.getToken(user.id);

    return {
      token,
    };
  }

  @Get('profile')
  async getProfile(@RequestUser() user: User) {
    const profile = await this.authService.getProfile(user.id);
    return profile;
  }
}

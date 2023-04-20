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
import { IsAuthenticated } from 'src/auth/decorators/is-authenticated.decorator';

@RemovePassword()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsAuthenticated()
  @Get()
  authenticate(@RequestUser() user: User) {
    return user;
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.authService.register(registerDto);
    const token = this.authService.getToken(user.id);

    return {
      token,
    };
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.login(loginDto);
    const token = this.authService.getToken(user.id);

    return {
      token,
    };
  }
}

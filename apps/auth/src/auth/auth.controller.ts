import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { LoginDto } from 'src/auth/dtos/login.dto';
import { RegisterDto } from 'src/auth/dtos/register.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/profile')
  async profile(@Headers('user-id') userId: string) {
    return this.authService.getUserById(userId);
  }

  @Post('/register')
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.authService.register(registerDto);
    const token = await this.authService.generateToken(user.id);

    return { token };
  }

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Body() data: LoginDto) {
    const user = await this.authService.verify(data.email, data.password);

    const token = await this.authService.generateToken(user.id);

    return { token };
  }
}

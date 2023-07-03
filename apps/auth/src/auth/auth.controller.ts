import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { RemovePassword, Auth } from '@shifter-shop/nest';
import { AuthService } from 'src/auth/auth.service';
import { LoginDto } from 'src/auth/dtos/login.dto';
import { RegisterDto } from 'src/auth/dtos/register.dto';
import { JwtService } from 'src/jwt/jwt.service';
import { TokenDto } from 'src/auth/dtos/token.dto';

@RemovePassword()
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Auth()
  @Get('/profile')
  async profile(@Headers('user-id') userId: string) {
    return this.authService.getUserById(userId);
  }

  @Post('/register')
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.authService.register(registerDto);
    const token = await this.jwtService.generateToken({ userId: user.id });

    return { token, user };
  }

  @HttpCode(200)
  @Post('/login')
  async login(@Body() data: LoginDto) {
    const user = await this.authService.verify(data.email, data.password);
    const token = await this.jwtService.generateToken({ userId: user.id });

    return { token, user };
  }

  @HttpCode(200)
  @Post('/login-admin')
  async loginAdmin(@Body() data: LoginDto) {
    const user = await this.authService.verifyAdmin(data.email, data.password);
    const token = await this.jwtService.generateToken({ userId: user.id });

    return { token, user };
  }

  // Private route for microservices
  @HttpCode(200)
  @Post('/verify-token')
  async verifyToken(@Body() data: TokenDto) {
    const tokenPayload = await this.jwtService.verifyToken(data.token);

    try {
      return await this.authService.getUserById(tokenPayload.userId);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}

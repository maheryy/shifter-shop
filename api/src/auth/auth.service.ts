import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from 'src/auth/dtos/login.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Payload } from 'src/auth/interfaces/payload.interface';
import { Prisma, User } from '@prisma/client';
import { RegisterDto } from 'src/auth/dtos/register.dto';
import { EncryptionService } from 'src/encryption/encryption.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly encryptionService: EncryptionService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register({ password, ...rest }: RegisterDto) {
    try {
      const hashedPassword = await this.encryptionService.hashPassword(
        password,
      );

      const user = await this.userService.create({
        ...rest,
        password: hashedPassword,
      });

      return user;
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('This email is already registered');
        }
      }

      throw error;
    }
  }

  async login({ email, password }: LoginDto) {
    const user = await this.userService.findOne({ email });

    if (!user) {
      throw new UnauthorizedException();
    }

    const isValidPassword = await this.encryptionService.validatePassword(
      password,
      user.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException();
    }

    return user;
  }

  getToken(userId: User['id']) {
    const payload: Payload = {
      sub: userId,
    };

    return this.jwtService.sign(payload);
  }
}

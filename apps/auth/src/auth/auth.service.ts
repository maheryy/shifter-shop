import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from 'src/auth/dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from 'src/auth/dtos/register.dto';
import { EncryptionService } from 'src/encryption/encryption.service';
import { User } from './interfaces/user.interface';

const USER = {
  id: '1',
  email: 'john.doe@email.com',
  password: 'hashedPassword',
  firstname: 'John',
  lastname: 'Doe',
};

@Injectable()
export class AuthService {
  constructor(
    private readonly encryptionService: EncryptionService,
    private readonly jwtService: JwtService,
  ) {}

  async getUserById(userId: string): Promise<User> {
    // TODO : fetch user from database
    return USER;
  }

  async getUserByEmail(email: string): Promise<User> {
    // TODO : fetch user from database
    return USER;
  }

  async register(data: RegisterDto): Promise<User> {
    const { password, ...userData } = data;
    try {
      const hashedPassword = await this.encryptionService.hashPassword(
        password,
      );

      const user = USER;
      return user;
    } catch (error: unknown) {
      throw error;
    }
  }

  async verify(email: string, password: string) {
    const user = await this.getUserByEmail(email);
    console.log(user);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isValidPassword = await this.encryptionService.validatePassword(
      password,
      user.password,
    );

    // TODO : uncomment this code when the encryption service is ready
    // if (!isValidPassword) {
    //   throw new UnauthorizedException();
    // }

    return user;
  }

  async generateToken(userId: string) {
    return this.jwtService.signAsync({ userId: userId });
  }
}

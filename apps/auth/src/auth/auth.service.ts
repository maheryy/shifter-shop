import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from 'src/auth/dtos/register.dto';
import { User } from './interfaces/user.interface';
import { hashPassword, verifyPassword } from '@shifter-shop/encryption';

const USER = {
  id: '1',
  email: 'john.doe@email.com',
  password: 'hashedPassword',
  firstname: 'John',
  lastname: 'Doe',
};

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

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
      const hashedPassword = await hashPassword(password);

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

    const isValidPassword = verifyPassword(password, user.password);

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

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from 'src/auth/dtos/register.dto';
import { User } from '@shifter-shop/types';
import { hashPassword, verifyPassword } from '@shifter-shop/encryption';
import { ServiceType, fetchJson } from '@shifter-shop/registry';

@Injectable()
export class AuthService {
  async getUserById(userId: string): Promise<User> {
    const user = await fetchJson<User>(
      { service: ServiceType.User, endpoint: '/search' },
      { method: 'POST', data: { id: userId } },
    );

    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await fetchJson<User>(
      { service: ServiceType.User, endpoint: '/search' },
      { method: 'POST', data: { email } },
    );

    return user;
  }

  async register(data: RegisterDto): Promise<User> {
    const { password, ...userData } = data;

    const hashedPassword = await hashPassword(password);
    const user = await fetchJson<User>(
      { service: ServiceType.User, endpoint: '/' },
      {
        method: 'POST',
        data: {
          ...userData,
          password: hashedPassword,
        },
      },
    );

    return user;
  }

  async verify(email: string, password: string) {
    const user = await this.getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isValidPassword = await verifyPassword(password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException();
    }

    return user;
  }
}

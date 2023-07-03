import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from 'src/auth/dtos/register.dto';
import { EService, TUser, EUserRole } from '@shifter-shop/dictionary';
import { hashPassword, verifyPassword } from '@shifter-shop/encryption';
import { fetchJson } from '@shifter-shop/helpers';

@Injectable()
export class AuthService {
  async getUserById(userId: string): Promise<TUser> {
    const user = await fetchJson<TUser>(
      { service: EService.User, endpoint: '/search' },
      { method: 'POST', data: { id: userId } },
    );

    return user;
  }

  async getUserByEmail(email: string): Promise<TUser> {
    const user = await fetchJson<TUser>(
      { service: EService.User, endpoint: '/search' },
      { method: 'POST', data: { email } },
    );

    return user;
  }

  async register(data: RegisterDto): Promise<TUser> {
    const { password, ...userData } = data;

    const hashedPassword = await hashPassword(password);
    const user = await fetchJson<TUser>(
      { service: EService.User, endpoint: '/' },
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

  async verifyAdmin(email: string, password: string) {
    const user = await this.verify(email, password);

    if (user.role !== EUserRole.Admin) {
      throw new UnauthorizedException();
    }

    return user;
  }
}

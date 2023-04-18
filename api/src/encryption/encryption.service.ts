import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { compare, hash } from 'bcrypt';

@Injectable()
export class EncryptionService {
  constructor(private readonly configService: ConfigService) {}

  validatePassword(password: string, hashedPassword: string) {
    return compare(password, hashedPassword);
  }

  hashPassword(password: string) {
    const saltOrRounds = this.configService.getOrThrow<number>(
      'bcrypt.saltOrRounds',
    );

    return hash(password, saltOrRounds);
  }
}

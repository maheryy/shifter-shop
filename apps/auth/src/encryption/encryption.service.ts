import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';

@Injectable()
export class EncryptionService {
  validatePassword(password: string, hashedPassword: string) {
    return compare(password, hashedPassword);
  }

  hashPassword(password: string) {
    return hash(password, 10);
  }
}

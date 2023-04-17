import { registerAs } from '@nestjs/config';
import { BcryptConfig } from '../interfaces/bcryptConfig.interface';

const bcryptConfig: BcryptConfig = {
  saltOrRounds: parseInt(process.env.BCRYPT_SALT_OR_ROUNDS || '10', 10),
};

export default registerAs('bcrypt', () => bcryptConfig);

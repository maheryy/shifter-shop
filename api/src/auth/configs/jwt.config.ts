import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

const jwtConfig: JwtModuleOptions = {
  secret: process.env.JWT_SECRET,
};

export default registerAs('jwt', () => jwtConfig);

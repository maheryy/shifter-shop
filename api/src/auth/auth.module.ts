import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { AuthController } from 'src/auth/auth.controller';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { EncryptionService } from 'src/encryption/encryption.service';
import jwtConfig from 'src/auth/configs/jwt.config';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(jwtConfig)],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.getOrThrow('jwt'),
    }),
  ],
  providers: [
    AuthService,
    ConfigService,
    EncryptionService,
    JwtStrategy,
    PrismaService,
    UserService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { AuthController } from 'src/auth/auth.controller';
import { JwtModule } from 'src/jwt/jwt.module';

@Module({
  imports: [JwtModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}

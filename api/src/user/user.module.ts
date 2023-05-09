import { Module } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserController } from './user.controller';

@Module({
  imports: [PrismaModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}

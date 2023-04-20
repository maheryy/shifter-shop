import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import bcryptConfig from 'src/encryption/configs/bcrypt.config';
import { EncryptionService } from 'src/encryption/encryption.service';

@Module({
  imports: [ConfigModule.forFeature(bcryptConfig)],
  providers: [EncryptionService],
})
export class EncryptionModule {}

import { Module } from '@nestjs/common';
import { EncryptionService } from 'src/encryption/encryption.service';

@Module({
  imports: [],
  providers: [EncryptionService],
  exports: [EncryptionService],
})
export class EncryptionModule {}

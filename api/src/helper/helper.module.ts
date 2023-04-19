import { Global, Module } from '@nestjs/common';
import { HelperService } from 'src/helper/helper.service';

@Global()
@Module({
  providers: [HelperService],
  exports: [HelperService],
})
export class HelperModule {}

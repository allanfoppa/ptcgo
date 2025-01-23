import { Module, Global } from '@nestjs/common';
import { HashingHelper } from './hashing.helper';

@Global()
@Module({
  imports: [],
  providers: [HashingHelper],
  exports: [HashingHelper],
})
export class MetadataModule {}

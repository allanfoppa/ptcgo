import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MetadataHelper } from './metadata.helper';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [MetadataHelper],
  exports: [MetadataHelper],
})
export class MetadataModule {}

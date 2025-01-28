import { Module, Global } from '@nestjs/common';
import { ValidatePasswordHelper } from './validate-password.helper';

@Global()
@Module({
  imports: [],
  providers: [ValidatePasswordHelper],
  exports: [ValidatePasswordHelper],
})
export class ValidatePasswordModule {}

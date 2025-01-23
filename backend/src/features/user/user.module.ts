import { Module } from '@nestjs/common';
import { RegistrationModule } from './registration/registration.module';
import { FindModule } from './find/find.module';

@Module({
  imports: [RegistrationModule, FindModule],
  controllers: [],
  providers: [],
})
export class UserModule {}

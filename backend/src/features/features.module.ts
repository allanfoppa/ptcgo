import { Module } from '@nestjs/common';
import { RegistrationModule } from './registration/registration.module';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [RegistrationModule, AuthenticationModule],
  controllers: [],
  providers: [],
})
export class FeaturesModule {}

import { Module } from '@nestjs/common';
import { RegistrationModule } from './registration/registration.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { DecksModule } from './decks/decks.module';

@Module({
  imports: [RegistrationModule, AuthenticationModule, DecksModule],
  controllers: [],
  providers: [],
})
export class FeaturesModule {}

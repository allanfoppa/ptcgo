import { Module } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { RegistrationController } from './registration.controller';
import { ResponseHelper } from 'src/common/helpers/response/response.helper';

@Module({
  controllers: [RegistrationController],
  providers: [RegistrationService, ResponseHelper],
})
export class RegistrationModule {}

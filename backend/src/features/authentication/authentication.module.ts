import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { ValidatePasswordModule } from 'src/common/helpers/validate-password/validate-password.module';
import { ResponseHelper } from 'src/common/helpers/response/response.helper';

@Module({
  imports: [ValidatePasswordModule],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, ResponseHelper],
})
export class AuthenticationModule {}

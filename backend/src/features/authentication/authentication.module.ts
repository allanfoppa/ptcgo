import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { ValidatePasswordModule } from 'src/common/helpers/validate-password/validate-password.module';
import { GetUserByUserNameHelper } from 'src/common/helpers/database/get-user-by-username/get-user-by-username.helper';
import { GetUserByUsernameRepository } from 'src/common/helpers/database/get-user-by-username/get-user-by-username.repository';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './authentication.constants';

@Module({
  imports: [
    ValidatePasswordModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    GetUserByUserNameHelper,
    GetUserByUsernameRepository,
    PrismaService,
  ],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}

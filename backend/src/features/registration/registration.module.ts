import { Module } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { RegistrationController } from './registration.controller';
import { HashingHelper } from 'src/common/helpers/hashing/hashing.helper';
import { RegistrationRepository } from './registration.repository';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import { ResponseHelper } from 'src/common/helpers/response/response.helper';
import { IsUsernameExistsService } from 'src/common/helpers/database/is-username-exists/is-username-exists.service';
import { IsUsernameExistsRepository } from 'src/common/helpers/database/is-username-exists/is-username-exists.repository';

@Module({
  imports: [],
  controllers: [RegistrationController],
  providers: [
    RegistrationService,
    RegistrationRepository,
    HashingHelper,
    ResponseHelper,
    PrismaService,
    IsUsernameExistsService,
    IsUsernameExistsRepository,
  ],
})
export class RegistrationModule {}

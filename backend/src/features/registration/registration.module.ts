import { Module } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { RegistrationController } from './registration.controller';
import { HashingHelper } from '@common/helpers/hashing/hashing.helper';
import { RegistrationRepository } from './registration.repository';
import { PrismaService } from '@common/services/prisma/prisma.service';
import { IsUsernameExistsService } from '@common/helpers/database/is-username-exists/is-username-exists.service';
import { IsUsernameExistsRepository } from '@common/helpers/database/is-username-exists/is-username-exists.repository';

@Module({
  imports: [],
  controllers: [RegistrationController],
  providers: [
    RegistrationService,
    RegistrationRepository,
    HashingHelper,
    PrismaService,
    IsUsernameExistsService,
    IsUsernameExistsRepository,
  ],
})
export class RegistrationModule { }

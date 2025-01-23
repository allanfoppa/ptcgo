import { Module } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { RegistrationController } from './registration.controller';
import { HashingHelper } from 'src/common/helpers/hashing/hashing.helper';
import { RegistrationRepository } from './registration.repository';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import { FindService } from '../find/find.service';
import { FindRepository } from '../find/find.repository';
import { ResponseHelper } from 'src/common/helpers/response/response.helper';

@Module({
  controllers: [RegistrationController],
  providers: [
    RegistrationService,
    HashingHelper,
    ResponseHelper,
    RegistrationRepository,
    PrismaService,
    FindService,
    FindRepository,
  ],
})
export class RegistrationModule {}

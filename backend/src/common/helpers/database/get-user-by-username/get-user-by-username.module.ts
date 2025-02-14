import { Module } from '@nestjs/common';
import { GetUserByUserNameHelper } from './get-user-by-username.helper';
import { GetUserByUsernameRepository } from './get-user-by-username.repository';
import { PrismaService } from '@common/services/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    GetUserByUserNameHelper,
    GetUserByUsernameRepository,
    PrismaService,
  ],
})
export class GetUserByUsernameModule {}

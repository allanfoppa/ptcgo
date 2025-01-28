import { Module } from '@nestjs/common';
import { IsUsernameExistsService } from './is-username-exists.service';
import { IsUsernameExistsRepository } from './is-username-exists.repository';
import { PrismaService } from 'src/common/services/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    IsUsernameExistsService,
    IsUsernameExistsRepository,
    PrismaService,
  ],
})
export class IsUsernameExistsModule {}

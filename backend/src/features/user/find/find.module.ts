import { Module } from '@nestjs/common';
import { FindService } from './find.service';
import { FindController } from './find.controller';
import { FindRepository } from './find.repository';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import { ResponseHelper } from 'src/common/helpers/response/response.helper';

@Module({
  controllers: [FindController],
  providers: [FindService, FindRepository, PrismaService, ResponseHelper],
  exports: [FindService, FindRepository],
})
export class FindModule {}

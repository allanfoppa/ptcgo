import { Module } from '@nestjs/common';
import { DecksService } from './decks.service';
import { DecksController } from './decks.controller';
import { DecksRepository } from './decks.repository';
import { PrismaService } from '@common/services/prisma/prisma.service';

@Module({
  controllers: [DecksController],
  providers: [DecksService, DecksRepository, PrismaService],
})
export class DecksModule {}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@common/services/prisma/prisma.service';
import { Deck } from '@prisma/client';
import { CreateDeckDto } from './dto/create-deck.dto';
import { UpdateDeckDto } from './dto/update-deck.dto';
import { ORDER } from '@common/enums/order.enum';

@Injectable()
export class DecksRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDeckDto: CreateDeckDto, userId: number): Promise<Deck> {
    const { name, description } = createDeckDto;

    return this.prisma.deck.create({
      data: {
        name,
        description,
        user: {
          connect: { id: userId },
        },
      },
    });
  }

  async findAll({ userId }: { userId: number }): Promise<Deck[]> {
    return this.prisma.deck.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        id: ORDER.ASC,
      },
    });
  }

  async findOne(id: number): Promise<Deck | null> {
    return this.prisma.deck.findUnique({
      where: { id },
    });
  }

  async update({
    id,
    updateDeckDto,
  }: {
    id: number;
    updateDeckDto: UpdateDeckDto;
  }): Promise<Deck> {
    const { name, description } = updateDeckDto;

    return this.prisma.deck.update({
      where: { id },
      data: {
        name,
        description,
      },
    });
  }

  async remove({ id }: { id: number }): Promise<Deck> {
    return this.prisma.deck.delete({
      where: { id },
    });
  }
}

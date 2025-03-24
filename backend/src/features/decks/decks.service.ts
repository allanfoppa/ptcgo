import { Injectable } from '@nestjs/common';
import { CreateDeckDto } from './dto/create-deck.dto';
import { UpdateDeckDto } from './dto/update-deck.dto';
import { DecksRepository } from './decks.repository';

@Injectable()
export class DecksService {
  constructor(private readonly decksRepository: DecksRepository) {}

  create(createDeckDto: CreateDeckDto, userId: number) {
    return this.decksRepository.create(createDeckDto, userId);
  }

  findAll({ userId }: { userId: number }) {
    return this.decksRepository.findAll({ userId });
  }

  findOne(id: number) {
    return this.decksRepository.findOne(id);
  }

  update({ id, updateDeckDto }: { id: number; updateDeckDto: UpdateDeckDto }) {
    return this.decksRepository.update({ id, updateDeckDto });
  }

  remove({ id }: { id: number }) {
    return this.decksRepository.remove({ id });
  }
}

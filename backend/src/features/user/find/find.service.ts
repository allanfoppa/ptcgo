import { Injectable } from '@nestjs/common';
import { FindRepository } from './find.repository';

@Injectable()
export class FindService {
  constructor(private readonly findRepository: FindRepository) {}

  async find(username: string): Promise<boolean> {
    return this.findRepository.find(username);
  }
}

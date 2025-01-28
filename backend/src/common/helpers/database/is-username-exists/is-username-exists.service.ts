import { Injectable } from '@nestjs/common';
import { IsUsernameExistsRepository } from './is-username-exists.repository';

@Injectable()
export class IsUsernameExistsService {
  constructor(
    private readonly isUsernameExistsRepository: IsUsernameExistsRepository,
  ) {}

  async isUserExists(username: string): Promise<boolean> {
    return this.isUsernameExistsRepository.isUserExists(username);
  }
}

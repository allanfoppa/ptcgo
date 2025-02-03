import { Injectable } from '@nestjs/common';
import { GetUserByUsernameRepository } from './get-user-by-username.repository';

@Injectable()
export class GetUserByUserNameHelper {
  constructor(
    private readonly getUserByUsernameRepository: GetUserByUsernameRepository,
  ) {}

  async getUser(username: string): Promise<any> {
    const user = await this.getUserByUsernameRepository.getUser(username);

    return user;
  }
}

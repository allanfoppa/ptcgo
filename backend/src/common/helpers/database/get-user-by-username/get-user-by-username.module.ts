import { Module } from '@nestjs/common';
import { GetUserByUsernameService } from './get-user-by-username.service';
import { GetUserByUsernameRepository } from './get-user-by-username.repository';

@Module({
  imports: [],
  controllers: [],
  providers: [GetUserByUsernameService, GetUserByUsernameRepository],
})
export class GetUserByUsernameModule {}

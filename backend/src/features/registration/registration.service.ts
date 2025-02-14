import { ConflictException, Injectable } from '@nestjs/common';
import { RegistrationDto } from './dto/create-registration.dto';
import { HashingHelper } from '@common/helpers/hashing/hashing.helper';
import { RegistrationRepository } from './registration.repository';
import { IsUsernameExistsService } from '@common/helpers/database/is-username-exists/is-username-exists.service';

@Injectable()
export class RegistrationService {
  constructor(
    private readonly hashingHelper: HashingHelper,
    private readonly registrationRepository: RegistrationRepository,
    private readonly isUsernameExistsService: IsUsernameExistsService,
  ) { }

  async registration(registrationDto: RegistrationDto) {
    const isUserExists = await this.isUsernameExistsService.isUserExists(
      registrationDto.username,
    );

    if (isUserExists) {
      throw new ConflictException('Username is already in use.');
    }

    registrationDto.password = await this.hashingHelper.hashPassword({
      password: registrationDto.password,
    });

    return await this.registrationRepository.registration(registrationDto);
  }
}

import { Injectable } from '@nestjs/common';
import { RegistrationDto } from './dto/create-registration.dto';
import { HashingHelper } from 'src/common/helpers/hashing/hashing.helper';
import { RegistrationRepository } from './registration.repository';

@Injectable()
export class RegistrationService {
  constructor(
    private readonly hashingHelper: HashingHelper,
    private readonly registrationRepository: RegistrationRepository,
  ) {}

  async registration(registrationDto: RegistrationDto) {
    registrationDto.password = await this.hashingHelper.hashPassword({
      password: registrationDto.password,
    });

    await this.registrationRepository.registration(registrationDto);
  }
}

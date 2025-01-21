import { Injectable } from '@nestjs/common';
import { CreateRegistrationDto } from './dto/create-registration.dto';

@Injectable()
export class RegistrationService {
  async create(createRegistrationDto: CreateRegistrationDto) {
    return await `This action adds a new registration ${createRegistrationDto.username}`;
  }
}

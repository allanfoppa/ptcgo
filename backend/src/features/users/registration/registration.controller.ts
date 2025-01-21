import {
  Controller,
  Post,
  Body,
  UsePipes,
  InternalServerErrorException,
} from '@nestjs/common';
import { RegistrationService } from './registration.service';
import {
  CreateRegistrationDto,
  createRegistrationSchema,
} from './dto/create-registration.dto';
import { ResponseHelper } from 'src/common/helpers/response/response.helper';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';

@Controller('users/registration')
export class RegistrationController {
  constructor(
    private readonly registrationService: RegistrationService,
    private readonly responseHelper: ResponseHelper,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createRegistrationSchema))
  async create(@Body() createRegistrationDto: CreateRegistrationDto) {
    console.log(createRegistrationDto);

    try {
      const response = await this.registrationService.create(
        createRegistrationDto,
      );

      return this.responseHelper.createResponse({
        message: 'User create with success.',
        content: response,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}

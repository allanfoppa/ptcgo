import {
  Controller,
  Post,
  Body,
  UsePipes,
  InternalServerErrorException,
} from '@nestjs/common';
import { RegistrationService } from './registration.service';
import {
  registrationSchema,
  RegistrationDto,
} from './dto/create-registration.dto';
import { ResponseHelper } from 'src/common/helpers/response/response.helper';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { FindService } from '../find/find.service';

@Controller('v1/user')
export class RegistrationController {
  constructor(
    private readonly registrationService: RegistrationService,
    private readonly responseHelper: ResponseHelper,
    private readonly findService: FindService,
  ) {}

  @Post('registration')
  @UsePipes(new ZodValidationPipe(registrationSchema))
  async registration(@Body() registrationDto: RegistrationDto) {
    try {
      const userExists = await this.findService.find(registrationDto.username);

      if (userExists) {
        return this.responseHelper.createResponse({
          message: 'User already exists.',
          content: { userExists },
        });
      }

      const response =
        await this.registrationService.registration(registrationDto);

      return this.responseHelper.createResponse({
        message: 'User create with success.',
        content: response,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}

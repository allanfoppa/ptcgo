import {
  Controller,
  Post,
  Body,
  UsePipes,
  InternalServerErrorException,
  HttpStatus,
} from '@nestjs/common';
import { RegistrationService } from './registration.service';
import {
  registrationSchema,
  RegistrationDto,
} from './dto/create-registration.dto';
import { ResponseHelper } from 'src/common/helpers/response/response.helper';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation/zod-validation.pipe';
import { IsUsernameExistsService } from '../../common/helpers/database/is-username-exists/is-username-exists.service';
import { STATUS } from 'src/common/enums/status.enum';

@Controller('registration')
export class RegistrationController {
  constructor(
    private readonly registrationService: RegistrationService,
    private readonly responseHelper: ResponseHelper,
    private readonly isUsernameExistsService: IsUsernameExistsService,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(registrationSchema))
  async registration(@Body() registrationDto: RegistrationDto) {
    try {
      const userExists = await this.isUsernameExistsService.isUserExists(
        registrationDto.username,
      );

      if (userExists) {
        return this.responseHelper.createResponse({
          status: STATUS.ERROR,
          statusCode: HttpStatus.CONFLICT,
          message: 'Username is already in use.',
          content: { userExists },
        });
      }

      const response =
        await this.registrationService.registration(registrationDto);

      return this.responseHelper.createResponse({
        status: STATUS.SUCCESS,
        statusCode: HttpStatus.CREATED,
        message: 'User create with success.',
        content: response,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}

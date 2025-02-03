import {
  Controller,
  Post,
  Body,
  UsePipes,
  InternalServerErrorException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { RegistrationService } from './registration.service';
import {
  registrationSchema,
  RegistrationDto,
} from './dto/create-registration.dto';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation/zod-validation.pipe';
import { IsUsernameExistsService } from '../../common/helpers/database/is-username-exists/is-username-exists.service';
import { STATUS } from 'src/common/enums/status.enum';

@Controller('registration')
export class RegistrationController {
  constructor(
    private readonly registrationService: RegistrationService,
    private readonly isUsernameExistsService: IsUsernameExistsService,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(registrationSchema))
  async registration(
    @Res() response: Response,
    @Body() registrationDto: RegistrationDto,
  ) {
    try {
      const userExists = await this.isUsernameExistsService.isUserExists(
        registrationDto.username,
      );

      if (userExists) {
        return response.status(HttpStatus.UNAUTHORIZED).json({
          metadata: {
            status: STATUS.ERROR,
            statusCode: HttpStatus.CONFLICT,
            message: 'Username is already in use.',
            info: {
              path: '/registration',
              timestamp: new Date().toISOString(),
            },
          },
          content: { userExists },
        });
      }

      const registrationResponse =
        await this.registrationService.registration(registrationDto);

      return response.status(HttpStatus.CREATED).json({
        metadata: {
          status: STATUS.SUCCESS,
          statusCode: HttpStatus.CREATED,
          message: 'User create with success.',
          info: {
            path: '/registration',
            timestamp: new Date().toISOString(),
          },
        },
        content: registrationResponse,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}

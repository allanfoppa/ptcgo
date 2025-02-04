import {
  Controller,
  Post,
  Body,
  UsePipes,
  ConflictException,
} from '@nestjs/common';
import { RegistrationService } from './registration.service';
import {
  registrationSchema,
  RegistrationDto,
} from './dto/create-registration.dto';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation/zod-validation.pipe';
import { IsUsernameExistsService } from '../../common/helpers/database/is-username-exists/is-username-exists.service';
import { ResponseHelper } from 'src/common/helpers/response/response.helper';
import { ResponseCatchHelper } from 'src/common/helpers/response-catch/response-catch.helper';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('registration')
export class RegistrationController {
  constructor(
    private readonly registrationService: RegistrationService,
    private readonly isUsernameExistsService: IsUsernameExistsService,
  ) {}

  @Post()
  @Public()
  @UsePipes(new ZodValidationPipe(registrationSchema))
  async registration(@Body() registrationDto: RegistrationDto) {
    try {
      const isUserExists = await this.isUsernameExistsService.isUserExists(
        registrationDto.username,
      );

      if (isUserExists) {
        throw new ConflictException('Username is already in use.');
      }

      const registrationResponse =
        await this.registrationService.registration(registrationDto);

      const { id, username } = registrationResponse;

      return ResponseHelper.success({
        message: 'Registration successful',
        data: {
          id,
          username,
        },
      });
    } catch (error) {
      ResponseCatchHelper.catch({ error });
    }
  }
}

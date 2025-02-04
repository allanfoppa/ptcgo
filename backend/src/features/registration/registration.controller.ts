import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import {
  registrationSchema,
  RegistrationDto,
} from './dto/create-registration.dto';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation/zod-validation.pipe';
import { ResponseHelper } from 'src/common/helpers/response/response.helper';
import { ResponseCatchHelper } from 'src/common/helpers/response-catch/response-catch.helper';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('registration')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Post()
  @Public()
  @UsePipes(new ZodValidationPipe(registrationSchema))
  async registration(@Body() registrationDto: RegistrationDto) {
    try {
      const { id, username } =
        await this.registrationService.registration(registrationDto);

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

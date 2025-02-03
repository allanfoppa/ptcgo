import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import {
  AuthenticationDto,
  authenticationSchema,
} from './dto/authentication.dto';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation/zod-validation.pipe';
import { ResponseCatchHelper } from 'src/common/helpers/response-catch/response-catch.helper';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticationSchema))
  async auth(@Body() authenticationDto: AuthenticationDto) {
    try {
      console.log(authenticationDto);
      return this.authenticationService.auth(authenticationDto);
    } catch (error) {
      ResponseCatchHelper.catch(error.message);
    }
  }
}

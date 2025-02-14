import {
  Body,
  Controller,
  HttpCode,
  // HttpException,
  // InternalServerErrorException,
  Post,
  UsePipes,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import {
  AuthenticationDto,
  authenticationSchema,
} from './dto/authentication.dto';
import { ZodValidationPipe } from '@common/pipes/zod-validation/zod-validation.pipe';
import { ResponseCatchHelper } from '@common/helpers/response-catch/response-catch.helper';
import { ResponseHelper } from '@common/helpers/response/response.helper';
import { Public } from '@common/decorators/public.decorator';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) { }

  @Post()
  @Public()
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(authenticationSchema))
  async auth(@Body() authenticationDto: AuthenticationDto) {
    try {
      const response = await this.authenticationService.auth(authenticationDto);
      return ResponseHelper.success({
        message: 'Login successful',
        data: response,
      });
    } catch (error) {
      return ResponseCatchHelper.catch({ error });
    }
  }
}

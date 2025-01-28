import { Body, Controller, HttpStatus, Post, UsePipes } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import {
  AuthenticationDto,
  authenticationSchema,
} from './dto/authentication.dto';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation/zod-validation.pipe';
import { ValidatePasswordHelper } from 'src/common/helpers/validate-password/validate-password.helper';
import { ResponseHelper } from 'src/common/helpers/response/response.helper';
import { STATUS } from 'src/common/enums/status.enum';

@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly validatePassword: ValidatePasswordHelper,
    private readonly responseHelper: ResponseHelper,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticationSchema))
  async auth(@Body() body: AuthenticationDto) {
    // STOP HERE
    const storedHashedPassword = 'hashedPassword';

    const isPasswordValid = await this.validatePassword.compare({
      password: body.password,
      hashedPassword: storedHashedPassword,
    });

    if (!isPasswordValid) {
      return this.responseHelper.createResponse({
        status: STATUS.ERROR,
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Invalid credentials.',
      });
    }

    console.log(body);
    return this.authenticationService.auth();
  }
}

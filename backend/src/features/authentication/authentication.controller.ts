import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UsePipes,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { Response } from 'express';
import {
  AuthenticationDto,
  authenticationSchema,
} from './dto/authentication.dto';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation/zod-validation.pipe';
import { ValidatePasswordHelper } from 'src/common/helpers/validate-password/validate-password.helper';
import { STATUS } from 'src/common/enums/status.enum';
import { GetUserByUserNameHelper } from 'src/common/helpers/database/get-user-by-username/get-user-by-username.helper';

@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly validatePassword: ValidatePasswordHelper,
    private readonly getUserByUserName: GetUserByUserNameHelper,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticationSchema))
  async auth(
    @Res() response: Response,
    @Body() authenticationDto: AuthenticationDto,
  ) {
    const { password } = await this.getUserByUserName.getUser(
      authenticationDto.username,
    );
    console.log(password);

    const isPasswordValid = await this.validatePassword.compare({
      password: authenticationDto.password,
      hashedPassword: password,
    });

    console.log(isPasswordValid);
    if (!isPasswordValid) {
      return response.status(HttpStatus.UNAUTHORIZED).json({
        metadata: {
          status: STATUS.ERROR,
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Invalid credentials.',
          info: {
            path: '/authentication',
            timestamp: new Date().toISOString(),
          },
        },
        content: {},
      });
    }

    return response.status(HttpStatus.UNAUTHORIZED).json({
      metadata: {
        status: STATUS.ERROR,
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Invalid credentials.',
        info: {
          path: '/authentication',
          timestamp: new Date().toISOString(),
        },
      },
      content: {
        user: {
          name: 'John Doe',
        },
      },
    });

    console.log(authenticationDto);
    return this.authenticationService.auth();
  }
}

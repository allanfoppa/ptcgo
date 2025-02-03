import { Injectable, UnauthorizedException } from '@nestjs/common';
import { GetUserByUserNameHelper } from 'src/common/helpers/database/get-user-by-username/get-user-by-username.helper';
import { ValidatePasswordHelper } from 'src/common/helpers/validate-password/validate-password.helper';
import { AuthenticationDto } from './dto/authentication.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly validatePassword: ValidatePasswordHelper,
    private readonly getUserByUserName: GetUserByUserNameHelper,
  ) {}

  async auth(authenticationDto: AuthenticationDto) {
    const user = await this.getUserByUserName.getUser(
      authenticationDto.username,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const isPasswordValid = await this.validatePassword.compare({
      password: authenticationDto.password,
      hashedPassword: user.password,
    });

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    return;
  }
}

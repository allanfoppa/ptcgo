import { Injectable, UnauthorizedException } from '@nestjs/common';
import { GetUserByUserNameHelper } from 'src/common/helpers/database/get-user-by-username/get-user-by-username.helper';
import { ValidatePasswordHelper } from 'src/common/helpers/validate-password/validate-password.helper';
import { AuthenticationDto } from './dto/authentication.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly validatePassword: ValidatePasswordHelper,
    private readonly getUserByUserName: GetUserByUserNameHelper,
    private jwtService: JwtService,
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

    const { id, username } = user;
    const payload = { sub: user.id, username: user.username };

    return {
      id,
      username,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

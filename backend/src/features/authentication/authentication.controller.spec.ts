import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { GetUserByUserNameHelper } from '@common/helpers/database/get-user-by-username/get-user-by-username.helper';
import { JwtService } from '@nestjs/jwt';
import { GetUserByUsernameRepository } from '@common/helpers/database/get-user-by-username/get-user-by-username.repository';
import { PrismaService } from '@common/services/prisma/prisma.service';
import { ValidatePasswordHelper } from '@common/helpers/validate-password/validate-password.helper';

describe('AuthenticationController', () => {
  let controller: AuthenticationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthenticationController],
      providers: [
        AuthenticationService,
        GetUserByUserNameHelper,
        JwtService,
        GetUserByUsernameRepository,
        PrismaService,
        ValidatePasswordHelper,
      ],
    }).compile();

    controller = module.get<AuthenticationController>(AuthenticationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationService } from './authentication.service';
import { ValidatePasswordHelper } from '@common/helpers/validate-password/validate-password.helper';
import { JwtService } from '@nestjs/jwt';
import { GetUserByUserNameHelper } from '@common/helpers/database/get-user-by-username/get-user-by-username.helper';
import { GetUserByUsernameRepository } from '@common/helpers/database/get-user-by-username/get-user-by-username.repository';
import { PrismaService } from '@common/services/prisma/prisma.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthenticationService,
        ValidatePasswordHelper,
        GetUserByUserNameHelper,
        JwtService,
        GetUserByUsernameRepository,
        PrismaService,
      ],
    }).compile();

    service = module.get<AuthenticationService>(AuthenticationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

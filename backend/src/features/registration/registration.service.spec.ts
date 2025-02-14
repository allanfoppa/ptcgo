import { Test, TestingModule } from '@nestjs/testing';
import { RegistrationService } from './registration.service';
import { HashingHelper } from '@common/helpers/hashing/hashing.helper';
import { RegistrationRepository } from './registration.repository';
import { IsUsernameExistsService } from '@common/helpers/database/is-username-exists/is-username-exists.service';
import { PrismaService } from '@common/services/prisma/prisma.service';
import { IsUsernameExistsRepository } from '@common/helpers/database/is-username-exists/is-username-exists.repository';

describe('RegistrationService', () => {
  let service: RegistrationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegistrationService,
        RegistrationRepository,
        HashingHelper,
        IsUsernameExistsService,
        IsUsernameExistsRepository,
        PrismaService,
      ],
    }).compile();

    service = module.get<RegistrationService>(RegistrationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

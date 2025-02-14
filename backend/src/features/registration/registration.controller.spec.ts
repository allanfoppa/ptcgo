import { Test, TestingModule } from '@nestjs/testing';
import { RegistrationController } from './registration.controller';
import { RegistrationService } from './registration.service';
import { IsUsernameExistsService } from '@common/helpers/database/is-username-exists/is-username-exists.service';
import { RegistrationRepository } from './registration.repository';
import { HashingHelper } from '@common/helpers/hashing/hashing.helper';
import { PrismaService } from '@common/services/prisma/prisma.service';
import { IsUsernameExistsRepository } from '@common/helpers/database/is-username-exists/is-username-exists.repository';

describe('RegistrationController', () => {
  let controller: RegistrationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegistrationController],
      providers: [
        RegistrationService,
        RegistrationRepository,
        IsUsernameExistsService,
        IsUsernameExistsRepository,
        HashingHelper,
        PrismaService,
      ],
    }).compile();

    controller = module.get<RegistrationController>(RegistrationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

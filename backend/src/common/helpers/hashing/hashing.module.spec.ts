import { Test, TestingModule } from '@nestjs/testing';
import { HashingHelper } from './hashing.helper';
import { MetadataModule } from './hashing.module';

describe('MetadataModule', () => {
  let hashingHelper: HashingHelper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MetadataModule],
    }).compile();

    hashingHelper = module.get<HashingHelper>(HashingHelper);
  });

  it('should be defined', () => {
    expect(hashingHelper).toBeDefined();
  });
});

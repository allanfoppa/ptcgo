import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ResponseHelper } from './common/helpers/response/response.helper';
import { MetadataHelper } from './common/helpers/metadata/metadata.helper';

@Injectable()
export class AppService {

  constructor(
    private readonly responseHelper: ResponseHelper,
    private readonly metadataHelper: MetadataHelper
  ){}

  metadata(): object {
    try {
      return this.responseHelper.createResponse({
        message: "Success retrieving metadata.",
        content: this.metadataHelper.get(),
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}

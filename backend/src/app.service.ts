import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Res,
} from '@nestjs/common';
import { MetadataHelper } from './common/helpers/metadata/metadata.helper';
import { STATUS } from './common/enums/status.enum';
import { Response } from 'express';

@Injectable()
export class AppService {
  private response: Response;

  constructor(
    @Res() response: Response,
    private readonly metadataHelper: MetadataHelper,
  ) {
    this.response = response;
  }

  metadata(): object {
    try {
      return this.response.status(HttpStatus.OK).json({
        metadata: {
          status: STATUS.SUCCESS,
          statusCode: HttpStatus.OK,
          message: 'Success retrieving metadata.',
          info: {
            path: '/',
            timestamp: new Date().toISOString(),
          },
        },
        content: this.metadataHelper.get(),
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}

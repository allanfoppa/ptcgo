import {
  Controller,
  Get,
  InternalServerErrorException,
  Param,
} from '@nestjs/common';
import { FindService } from './find.service';
import { ResponseHelper } from 'src/common/helpers/response/response.helper';

@Controller('v1/user')
export class FindController {
  constructor(
    private readonly findService: FindService,
    private readonly responseHelper: ResponseHelper,
  ) {}

  @Get('find/:username')
  async find(@Param('username') username: string) {
    try {
      const response = await this.findService.find(username);

      return this.responseHelper.createResponse({
        message: 'User find with success.',
        content: { userFound: response },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}

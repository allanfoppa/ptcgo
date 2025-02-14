import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { AppService } from './app.service';
import { ResponseHelper } from '@common/helpers/response/response.helper';
import { Public } from '@common/decorators/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Public()
  metadata(): object {
    try {
      const response = this.appService.metadata();
      return ResponseHelper.success({
        message: 'Metadata retrieved successfully',
        data: response,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}

import { Injectable } from '@nestjs/common';

type TResponseHelper = {
  message: string;
  additionalMetadata?: any;
  content?: any;
}

@Injectable()
export class ResponseHelper {
  createResponse({
    message,
    content,
    additionalMetadata
  }: TResponseHelper) {
    return {
      metadata: {
        message,
        additionalMetadata
      },
      content,
    };
  }
}

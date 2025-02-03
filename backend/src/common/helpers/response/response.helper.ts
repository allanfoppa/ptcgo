type TResponseHelperSuccess = {
  message: string;
  data: any;
};

export class ResponseHelper {
  static success({
    message = 'Success',
    data,
  }: TResponseHelperSuccess): object {
    return {
      message,
      data,
    };
  }
}

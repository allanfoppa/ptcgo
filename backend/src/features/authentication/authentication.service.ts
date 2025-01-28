import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthenticationService {
  async auth() {
    return 'auth';
  }
}

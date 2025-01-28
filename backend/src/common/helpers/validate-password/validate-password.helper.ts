import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

type TValidatePassword = {
  password: string;
  hashedPassword: string;
};

@Injectable()
export class ValidatePasswordHelper {
  async compare({
    password,
    hashedPassword,
  }: TValidatePassword): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}

import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

type THash = {
  password: string;
};

@Injectable()
export class HashingHelper {
  private readonly saltRounds: number = Number(process.env.SALT_ROUNDS);

  async hashPassword({ password }: THash): Promise<string> {
    const hash = await bcrypt.hash(password, this.saltRounds);

    return hash;
  }
}

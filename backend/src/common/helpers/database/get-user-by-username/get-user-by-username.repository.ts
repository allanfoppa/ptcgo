import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma/prisma.service';

type TUser = {
  id: number;
  username: string;
  password: string;
  createdAt: Date;
}

@Injectable()
export class GetUserByUsernameRepository {
  constructor(private readonly prisma: PrismaService) { }

  async getUser(username: string): Promise<TUser | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        username,
      },
    });

    return user;
  }
}

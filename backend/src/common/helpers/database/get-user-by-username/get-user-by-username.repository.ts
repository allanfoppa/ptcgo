import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma/prisma.service';

@Injectable()
export class GetUserByUsernameRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getUser(username: string): Promise<any> {
    const user = await this.prisma.user.findFirst({
      where: {
        username,
      },
    });

    return user;
  }
}

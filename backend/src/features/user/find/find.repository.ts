import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma/prisma.service';

@Injectable()
export class FindRepository {
  constructor(private readonly prisma: PrismaService) {}

  async find(username: string): Promise<boolean> {
    const user = await this.prisma.user.findFirst({
      where: {
        username,
      },
    });

    return user !== null;
  }
}

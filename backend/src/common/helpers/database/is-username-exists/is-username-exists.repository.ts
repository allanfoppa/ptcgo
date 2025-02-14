import { Injectable } from '@nestjs/common';
import { PrismaService } from '@common/services/prisma/prisma.service';

@Injectable()
export class IsUsernameExistsRepository {
  constructor(private readonly prisma: PrismaService) { }

  async isUserExists(username: string): Promise<boolean> {
    const user = await this.prisma.user.findFirst({
      where: {
        username,
      },
    });

    return user !== null;
  }
}

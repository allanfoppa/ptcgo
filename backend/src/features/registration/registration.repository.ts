import { Injectable } from '@nestjs/common';
import { PrismaService } from '@common/services/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class RegistrationRepository {
  constructor(private readonly prisma: PrismaService) { }

  async registration(registrationDto: Prisma.UserCreateInput): Promise<User> {
    const { username, password } = registrationDto;

    return this.prisma.user.create({
      data: {
        username,
        password,
      },
    });
  }
}

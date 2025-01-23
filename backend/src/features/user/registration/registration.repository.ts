import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class RegistrationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async registration(registrationDto: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data: {
        username: registrationDto.username,
        password: registrationDto.password,
      },
    });
  }
}

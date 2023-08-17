import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto, UpdateUserDto } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private databaseService: PrismaService) {}

  async create(user: CreateUserDto) {
    const newUser = await this.databaseService.user.create({
      data: user,
    });

    return newUser;
  }

  async findAll() {
    return await this.databaseService.user.findMany();
  }

  async findOne(id: string) {
    const foundUser = this.databaseService.user.findUnique({
      where: { id: id },
    });

    if (foundUser === null) {
      throw new NotFoundException('user not found');
    }

    return foundUser;
  }

  async update(id: string, { oldPassword, newPassword }: UpdateUserDto) {
    const foundUser = await this.databaseService.user.findUnique({
      where: { id: id },
    });

    if (foundUser === null) {
      throw new NotFoundException('user not found');
    }

    if (foundUser.password === oldPassword) {
      await this.databaseService.user.update({
        where: { id: id },
        data: {
          version: { increment: 1 },
          password: newPassword,
        },
      });

      return await this.databaseService.user.findUnique({
        where: { id: id },
      });
    }

    throw new ForbiddenException(`User oldPassword is wrong`);
  }

  async remove(id: string) {
    try {
      await this.databaseService.user.delete({
        where: { id: id },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`User was not found`);
      } else throw error;
    }
  }
}

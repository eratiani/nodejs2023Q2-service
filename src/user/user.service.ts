import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CreateUserDto, UpdateUserDto } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { BcryptService } from 'src/util/crypto.service';

@Injectable()
export class UserService {
  constructor(
    private databaseService: PrismaService,
    private bcrypt: BcryptService,
  ) {}

  async create(user: CreateUserDto) {
    try {
      const hashedPassword = await this.bcrypt.hashPassword(user.password);
      const newUser = await this.databaseService.user.create({
        data: {
          ...user,
          password: hashedPassword,
        },
      });

      return newUser;
    } catch (err) {
      if (
        err instanceof PrismaClientKnownRequestError &&
        err.code === 'P2002'
      ) {
        throw new ConflictException(
          `User with login ${user.login} already exists in users`,
        );
      } else {
        throw err;
      }
    }
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
  async findOneByLogin(login: string) {
    return await this.databaseService.user.findUnique({
      where: { login: login },
    });
  }
  async update(updateUserDto: UpdateUserDto, id: string) {
    const checkUser = await this.databaseService.user.findUnique({
      where: { id: id },
    });
    if (!checkUser) {
      throw new NotFoundException(`User with id ${id} doesn't exist`);
    }

    const isMatch = await this.bcrypt.comparePassword(
      updateUserDto.oldPassword,
      checkUser.password,
    );
    if (!isMatch) {
      throw new ForbiddenException('OldPassword is wrong');
    }

    try {
      const hashedPassword = await this.bcrypt.hashPassword(
        updateUserDto.newPassword,
      );
      const updateUser = await this.databaseService.user.update({
        where: { id: id },
        data: {
          password: hashedPassword,
          version: { increment: 1 },
        },
      });
      if (updateUser) {
        return updateUser;
      }
    } catch (err) {
      return err;
    }
  }

  async remove(id: string) {
    try {
      await this.databaseService.user.delete({
        where: { id: id },
      });
      return true;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`User with id ${id} doesn't exist`);
        } else {
          throw error;
        }
      } else {
        console.error;
      }
      return false;
    }
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { DbService } from 'src/db/db.service';
import { CreateUserDto, UpdateUserDto } from 'src/dto';
import { User } from 'src/entities';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    private databaseService: DbService,
    private readonly authenticationService: AuthService,
  ) {}

  async create({ login, password }: CreateUserDto) {
    const user = new User({
      id: uuidv4(),
      login,
      password: await this.authenticationService.hashPassword(password),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return this.databaseService.create('users', user);
  }

  async findAll() {
    return this.databaseService.find('users');
  }

  async findOne(id: string) {
    const foundUser = this.databaseService.findOneBy('users', id);

    if (foundUser === null) {
      throw new NotFoundException('user not found');
    }

    return foundUser;
  }

  async update(id: string, { oldPassword, newPassword }: UpdateUserDto) {
    const foundUser = this.databaseService.findOneBy('users', id);

    if (foundUser === null) {
      throw new NotFoundException('user not found');
    }

    const { password: hashedPassword } = foundUser;

    const isPasswordMatching = await this.authenticationService.verifyPassword(
      oldPassword,
      hashedPassword,
    );

    if (!isPasswordMatching) {
      throw new NotFoundException('user not found');
    }

    const updatedUser = new User({
      ...foundUser,
      password: await this.authenticationService.hashPassword(newPassword),
      updatedAt: Date.now(),
      version: foundUser.version + 1,
    });

    return this.databaseService.update('users', id, updatedUser);
  }

  async remove(id: string) {
    if (!this.databaseService.has('users', id)) {
      throw new NotFoundException('user not found');
    }

    return this.databaseService.remove('users', id);
  }
}

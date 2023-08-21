import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { CreateUserDto } from 'src/dto';
import { CreateAuthUserDto, RefreshDto } from 'src/dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { BcryptService } from 'src/util/crypto.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private bcrypt: BcryptService,
    private jwtService: JwtService,
  ) {}

  async signup(createUser: CreateUserDto) {
    try {
      const user = await this.userService.create(createUser);

      return { message: 'User created successfully', id: user.id };
    } catch (err) {
      throw err;
    }
  }

  async login(createuser: CreateAuthUserDto) {
    const user = await this.userService.findOneByLogin(createuser.login);
    if (!user) {
      throw new ForbiddenException(
        `User with id ${createuser.login} doesn't exist`,
      );
    }

    if (user) {
      const isMatch = await this.bcrypt.comparePassword(
        createuser.password,
        user.password,
      );
      if (!isMatch) {
        throw new ForbiddenException('Password is wrong');
      }
      const payload = { sub: user.id, username: user.login };

      return {
        accessToken: await this.jwtService.signAsync(payload),
        refreshToken: await this.jwtService.signAsync(payload, {
          secret: process.env.JWT_SECRET_REFRESH_KEY,
          expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
        }),
      };
    }
  }

  async refresh(refreshDto: RefreshDto) {
    try {
      const payload = await this.jwtService.verifyAsync(
        refreshDto.refreshToken,
        {
          secret: process.env.JWT_SECRET_REFRESH_KEY,
        },
      );
      const { sub: id, username: login } = payload;

      const newPayload = { sub: id, username: login };

      const user = await this.userService.findOne(id);
      if (!user) {
        throw new ForbiddenException(`User with id ${id} doesn't exist`);
      }
      return {
        accessToken: await this.jwtService.signAsync(newPayload),
        refreshToken: await this.jwtService.signAsync(newPayload, {
          secret: process.env.JWT_SECRET_REFRESH_KEY,
          expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
        }),
      };
    } catch (err) {
      throw new ForbiddenException({
        message: `Refresh token is invalid or expired or this other error.  ${err.message}`,
      });
    }
  }
}

import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DbService } from 'src/db/db.service';
import { AuthService } from 'src/auth/auth.service';
import { BcryptService } from 'src/util/crypto.service';

@Module({
  controllers: [UserController],
  providers: [UserService, DbService, AuthService, BcryptService],
})
export class UserModule {}

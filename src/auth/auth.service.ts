import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';

@Injectable()
export class AuthService {
  async hashPassword(plainTextPassword: string) {
    return await hash(plainTextPassword, 11);
  }

  async verifyPassword(plainTextPassword: string, hashedPassword: string) {
    return await compare(plainTextPassword, hashedPassword);
  }
}

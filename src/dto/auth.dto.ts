import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { CreateUserDto } from '.';
import { TokenPayload } from 'src/auth/token-payload.interface';

export class CreateAuthUserDto extends CreateUserDto {}

export class RefreshDto {
  @IsNotEmpty()
  refreshToken: string;

  @IsOptional()
  tokenPayload: TokenPayload;
}

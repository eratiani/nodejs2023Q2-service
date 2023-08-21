import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { CreateUserDto } from '.';

export class CreateAuthUserDto extends CreateUserDto {}

export class CreateResponseAuthDto {
  @ApiProperty({
    type: String,
  })
  message: string;
}
export class UpdateAuthUserDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}

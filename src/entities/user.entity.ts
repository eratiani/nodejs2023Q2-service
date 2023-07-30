import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({
    type: String,
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    type: String,
    example: 'smth',
  })
  login: string;

  @ApiProperty({
    type: 'integer',
    example: 123,
  })
  version: number;

  @ApiProperty({
    type: Number,
    example: 123213231,
  })
  createdAt: number;

  @ApiProperty({
    type: Number,
    example: 123123,
  })
  updatedAt: number;
  @ApiProperty({
    type: String,
    example: 'SMth1234',
  })
  password: string;
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}

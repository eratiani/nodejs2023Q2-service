import { ApiProperty } from '@nestjs/swagger';

export class FavCreateResponseDto {
  @ApiProperty({
    type: String,
  })
  message: string;
}

import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class CreateAlbumDto {
  @ApiProperty({
    type: String,
    description: 'This is a required property',
    example: 'sting',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: 'integer',
    description: 'This is a required property',
    example: 1992,
  })
  @IsNumber()
  @IsNotEmpty()
  year: number;

  @ApiProperty({
    type: String,
    nullable: true,
    description: 'This is a required property',
    format: 'uuid',
  })
  @IsUUID()
  @ValidateIf((_object, value) => value !== null)
  artistId: string | null;
}
export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {}

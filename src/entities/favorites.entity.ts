import { ApiProperty } from '@nestjs/swagger';
import { Album } from './album.entity';
import { Artist } from './artist.entity';
import { Track } from './track.entity';

export class Favorites {
  @ApiProperty({
    type: [Artist],
  })
  artists: Artist[];

  @ApiProperty({
    type: [Album],
  })
  albums: Album[];

  @ApiProperty({
    type: [Track],
  })
  tracks: Track[];
}

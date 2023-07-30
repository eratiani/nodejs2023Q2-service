import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateTrackDto, UpdateTrackDto } from 'src/dto';
import { Track } from 'src/entities';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TrackService {
  constructor(private readonly databaseService: DbService) {}

  create(createTrackDto: CreateTrackDto) {
    const { name, duration, artistId, albumId } = createTrackDto;

    const trackArtistId = this.databaseService.has('artists', artistId)
      ? artistId
      : null;

    const trackAlbumId = this.databaseService.has('albums', albumId)
      ? albumId
      : null;

    const track = new Track({
      id: uuidv4(),
      name,
      artistId: trackArtistId,
      albumId: trackAlbumId,
      duration,
    });

    return this.databaseService.create('tracks', track);
  }

  findAll() {
    return this.databaseService.find('tracks');
  }

  findOne(id: string) {
    const foundTrack = this.databaseService.findOneBy('tracks', id);

    if (foundTrack === null) {
      throw new NotFoundException('track not found');
    }

    return foundTrack;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const foundTrack = this.databaseService.findOneBy('tracks', id);

    if (foundTrack === null) {
      throw new NotFoundException('track not found');
    }

    const updatedTrack = new Track({
      ...foundTrack,
      ...updateTrackDto,
    });

    return this.databaseService.update('tracks', id, updatedTrack);
  }

  remove(id: string) {
    if (!this.databaseService.has('tracks', id)) {
      throw new NotFoundException('track not found');
    }

    // Remove from favorites
    this.databaseService.favorites.tracks.delete(id);

    return this.databaseService.remove('tracks', id);
  }
}

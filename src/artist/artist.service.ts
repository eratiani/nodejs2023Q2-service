import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateArtistDto, UpdateArtistDto } from 'src/dto';
import { Artist } from 'src/entities';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ArtistService {
  constructor(private databaseService: DbService) {}

  create(createArtistDto: CreateArtistDto): Artist {
    const artist = new Artist({
      id: uuidv4(),
      ...createArtistDto,
    });

    return this.databaseService.create('artists', artist);
  }

  findAll(): Artist[] {
    return this.databaseService.find('artists');
  }

  findOne(id: string): Artist {
    const foundArtist = this.databaseService.findOneBy('artists', id);

    if (foundArtist === null) {
      throw new NotFoundException('artist not found');
    }

    return foundArtist;
  }

  update(id: string, { name, grammy }: UpdateArtistDto) {
    const foundArtist = this.databaseService.findOneBy('artists', id);

    if (foundArtist === null) {
      throw new NotFoundException('artist not found');
    }

    const updatedArtist = new Artist({ ...foundArtist, name, grammy });

    return this.databaseService.update('artists', id, updatedArtist);
  }

  remove(id: string) {
    if (!this.databaseService.has('artists', id)) {
      throw new NotFoundException('artist not found');
    }

    // Remove from favorites
    this.databaseService.favorites.artists.delete(id);

    // Remove from tracks
    const tracks = this.databaseService.find('tracks');

    tracks.forEach((track) => {
      if (track.artistId === id) {
        const updatedTrack = {
          ...track,
          artistId: null,
        };

        this.databaseService.update('tracks', track.id, updatedTrack);
      }
    });

    // Remove from albums
    const albums = this.databaseService.find('albums');

    albums.forEach((album) => {
      if (album.artistId === id) {
        const updatedAlbum = {
          ...album,
          artistId: null,
        };

        this.databaseService.update('albums', album.id, updatedAlbum);
      }
    });

    return this.databaseService.remove('artists', id);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { error } from 'console';
import { DbService } from 'src/db/db.service';
import { CreateAlbumDto, UpdateAlbumDto } from 'src/dto';
import { Album } from 'src/entities';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AlbumService {
  constructor(private databaseService: DbService) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const { name, year, artistId } = createAlbumDto;

    const album = new Album({
      id: uuidv4(),
      name,
      year,
      artistId: artistId || null,
    });

    return this.databaseService.create('albums', album);
  }

  async findAll() {
    return this.databaseService.find('albums');
  }

  async findOne(id: string) {
    const foundAlbum = this.databaseService.findOneBy('albums', id);

    if (foundAlbum === null) {
      throw new NotFoundException('Album not found');
    }

    return foundAlbum;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const foundAlbum = this.databaseService.findOneBy('albums', id);

    if (foundAlbum === null) {
      throw new NotFoundException('Album not found');
    }

    const updatedTrack = new Album({
      ...foundAlbum,
      ...updateAlbumDto,
    });

    return this.databaseService.update('albums', id, updatedTrack);
  }

  async remove(id: string) {
    if (!this.databaseService.has('albums', id)) {
      throw new NotFoundException('Album not found');
    }

    // Remove from favorites
    this.databaseService.favorites.albums.delete(id);

    // Remove from tracks
    const tracks = this.databaseService.find('tracks');

    tracks.forEach((track) => {
      if (track.albumId === id) {
        const updatedTrack = {
          ...track,
          albumId: null,
        };

        this.databaseService.update('tracks', track.id, updatedTrack);
      }
    });

    return this.databaseService.remove('tracks', id);
  }
}

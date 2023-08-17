import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { DbService } from 'src/db/db.service';
import { CreateAlbumDto, UpdateAlbumDto } from 'src/dto';
import { Album } from 'src/entities';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AlbumService {
  constructor(private databaseService: PrismaService) {}

  async create(createAlbumDto: CreateAlbumDto) {
    return await this.databaseService.album.create({
      data: createAlbumDto,
    });
  }

  async findAll() {
    return await this.databaseService.album.findMany();
  }

  async findOne(id: string) {
    const foundAlbum = await this.databaseService.album.findUnique({
      where: { id: id },
    });
    if (foundAlbum === null) {
      throw new NotFoundException('Album not found');
    }

    return foundAlbum;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    try {
      return await this.databaseService.album.update({
        where: { id },
        data: updateAlbumDto,
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Album was not found`);
      } else throw error;
    }
  }

  async remove(id: string) {
    try {
      await this.databaseService.album.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Artist was not found`);
      } else throw error;
    }
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CreateArtistDto, UpdateArtistDto } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtistService {
  constructor(private databaseService: PrismaService) {}

  async create(createArtistDto: CreateArtistDto) {
    const newArtist = await this.databaseService.artist.create({
      data: createArtistDto,
    });
    return newArtist;
  }

  async findAll() {
    return await this.databaseService.artist.findMany();
  }

  async findOne(id: string) {
    const foundArtist = await this.databaseService.artist.findUnique({
      where: { id: id },
    });

    if (foundArtist === null) {
      throw new NotFoundException('artist not found');
    }

    return foundArtist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    try {
      return await this.databaseService.artist.update({
        where: { id: id },
        data: updateArtistDto,
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

  async remove(id: string) {
    try {
      await this.databaseService.artist.delete({
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

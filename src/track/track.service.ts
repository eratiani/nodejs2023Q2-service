import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { DbService } from 'src/db/db.service';
import { CreateTrackDto, UpdateTrackDto } from 'src/dto';
import { Track } from 'src/entities';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TrackService {
  constructor(private readonly databaseService: PrismaService) {}

  async create(createTrackDto: CreateTrackDto) {
    return await this.databaseService.track.create({
      data: createTrackDto,
    });
  }

  async findAll() {
    return await this.databaseService.track.findMany();
  }

  async findOne(id: string) {
    const foundTrack = await this.databaseService.track.findUnique({
      where: { id: id },
    });

    if (foundTrack === null) {
      throw new NotFoundException('track not found');
    }

    return foundTrack;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    try {
      return await this.databaseService.track.update({
        where: { id },
        data: updateTrackDto,
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Track was not found`);
      } else throw error;
    }
  }

  async remove(id: string) {
    try {
      await this.databaseService.track.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Track was not found`);
      } else throw error;
    }
  }
}

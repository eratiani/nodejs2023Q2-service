import { Injectable } from '@nestjs/common';
import { CreateArtistDto, UpdateArtistDto } from 'src/dto';

@Injectable()
export class ArtistService {
    constructor() {}

  async create(createArtistDto: CreateArtistDto) {

  }

  async findAll() {
  
  }

  async findOne(id: string) {

  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
  
  }

  async remove(id: string) {
  }
}

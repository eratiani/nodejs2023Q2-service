import { Injectable } from '@nestjs/common';
import { CreateAlbumDto, UpdateAlbumDto } from 'src/dto';

@Injectable()
export class AlbumService {
    constructor() {}

    async create(createAlbumDto: CreateAlbumDto) {
      
    }
  
    async findAll() {
      
    }
  
    async findOne(id: string) {
    
    }
  
    async update(id: string, updateAlbumDto: UpdateAlbumDto) {
     
    }
  
    async remove(id: string) {
      
    }
}

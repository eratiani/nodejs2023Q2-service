import { Injectable } from '@nestjs/common';
import { CreateTrackDto, UpdateTrackDto } from 'src/dto';

@Injectable()
export class TrackService {
    constructor() {}

    async create(createTrackDto: CreateTrackDto) {
   
    }
  
    async findAll() {
     
    }
  
    async findOne(id: string) {
    
    }
  
    async update(id: string, updateTrackDto: UpdateTrackDto) {
     
    }
  
    async remove(id: string) {
    }
}

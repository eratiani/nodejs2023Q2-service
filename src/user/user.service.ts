import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'src/dto';

@Injectable()
export class UserService {
    constructor() {}

    async create(createUserDto: CreateUserDto) {
    
    }
  
    async findAll() {
  
    }
  
    async findOne(id: string) {
    
    }
  
    async update(id: string, updateUserDto: UpdateUserDto) {
     
    }
  
    async remove(id: string) {
      
    }
}

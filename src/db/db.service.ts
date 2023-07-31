import { Injectable } from '@nestjs/common';
import { DataBase } from './local-db/dataBase';
import { IDB } from './local-db/db.interface';

@Injectable()
export class DbService {
  database: IDB;
  constructor() {
    this.database = DataBase;
  }
  get users() {
    return this.database.users;
  }

  get artists() {
    return this.database.artists;
  }

  get tracks() {
    return this.database.tracks;
  }

  get albums() {
    return this.database.albums;
  }

  get favorites() {
    return this.database.favorites;
  }
  find(type: string) {
    return this.database[type];
  }

  findOneBy(type: string, id) {
    return this.database[type].find((item) => item.id === id) || null;
  }

  remove(type: string, id: string) {
    const foundIndex = this.database[type].findIndex((item) => item.id === id);

    if (foundIndex === -1) {
      return false;
    }

    this.database[type].splice(foundIndex, 1);

    return true;
  }

  create(type: string, dto) {
    this.database[type].push(dto);

    return dto;
  }

  update(type: string, id: string, dto) {
    const foundIndex = this.database[type].findIndex((item) => item.id === id);

    if (foundIndex === -1) {
      return null;
    }

    this.database[type][foundIndex] = dto;

    return dto;
  }

  has(type: string, id: string) {
    return Boolean(this.findOneBy(type, id));
  }
}

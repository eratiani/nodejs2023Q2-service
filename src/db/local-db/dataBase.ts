import { Artist, Album, Track } from 'src/entities';
import { IDB } from './db.interface';

export const DataBase: IDB = {
  users: [],
  artists: [],
  tracks: [],
  albums: [],
  favorites: {
    artists: new Map<string, Artist>(),
    albums: new Map<string, Album>(),
    tracks: new Map<string, Track>(),
  },
};

import { User, Artist, Track, Album } from 'src/entities';

export class IDB {
  users: User[];
  artists: Artist[];
  tracks: Track[];
  albums: Album[];
  favorites: IFavorites;
}
export interface IFavorites {
  artists?: Map<string, Artist>;
  albums?: Map<string, Album>;
  tracks?: Map<string, Track>;
}

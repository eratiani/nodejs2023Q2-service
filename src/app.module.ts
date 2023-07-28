import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { FavoritesModule } from './favorites/favorites.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [AuthModule, UserModule, TrackModule, ArtistModule, AlbumModule, FavoritesModule, DbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { DbService } from 'src/db/db.service';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, DbService],
})
export class ArtistModule {}

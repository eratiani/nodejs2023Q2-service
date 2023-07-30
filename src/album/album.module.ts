import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { DbService } from 'src/db/db.service';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, DbService],
})
export class AlbumModule {}

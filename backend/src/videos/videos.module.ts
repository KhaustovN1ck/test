import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoEntity } from './entities/video.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VideoEntity])],
  controllers: [VideosController],
  providers: [VideosService],
})
export class VideosModule {}

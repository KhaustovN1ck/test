import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { VideoEntity } from './entities/video.entity';
import { Repository } from 'typeorm';
import { UpdateVideoDto } from './dto/update-video.dto';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(VideoEntity)
    private readonly videosRepository: Repository<VideoEntity>,
  ) {}

  create(createVideoDto: CreateVideoDto) {
    const newVideo = new VideoEntity();
    newVideo.videoName = createVideoDto.videoName;
    newVideo.fileName = createVideoDto.fileName;
    newVideo.extension = createVideoDto.extension;
    return this.videosRepository.save(newVideo);
  }

  findAll() {
    return this.videosRepository.find({
      order: {
        createdTime: 'DESC',
      },
    });
  }

  async getVideoFileById(id: string) {
    const video = await this.videosRepository.findOneOrFail(id);
    return video.fileName;
  }

  async update(id: string, updateVideoDto: UpdateVideoDto) {
    const videoToUpdate = await this.videosRepository.findOneOrFail(id);
    return this.videosRepository.save({
      ...videoToUpdate,
      ...updateVideoDto,
      updatedTime: new Date().toISOString(),
    });
  }

  remove(id: string) {
    return `This action removes a #${id} video`;
  }
}

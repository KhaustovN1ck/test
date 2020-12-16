import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { randomBytes } from 'crypto';

@Controller('/api/v1/videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: `${__dirname}../../../uploads`,
        filename: (req, file, cb) => {
          cb(
            null,
            `${randomBytes(64).toString('hex')}${extname(file.originalname)}`,
          );
        },
      }),
    }),
  )
  upload(@Body() createVideoDto: CreateVideoDto, @UploadedFile() file) {
    return this.videosService.create({
      ...createVideoDto,
      fileName: file.filename,
      extension: extname(file.originalname),
    });
  }

  @Get()
  async getAllRecords() {
    return this.videosService.findAll();
  }

  @Get(':videoId')
  async getVideoFile(@Param('videoId') videoId, @Res() res) {
    const path = await this.videosService.getVideoFileById(videoId);
    const response = res.sendFile(path, { root: './uploads' });
    return {
      status: HttpStatus.OK,
      data: response,
    };
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videosService.update(id, updateVideoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videosService.remove(id);
  }
}

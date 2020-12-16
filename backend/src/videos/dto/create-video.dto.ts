import { VideoEntity } from '../entities/video.entity';

export type CreateVideoDto = Pick<
  VideoEntity,
  'videoName' | 'fileName' | 'extension'
>;

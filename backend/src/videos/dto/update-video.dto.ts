import { VideoEntity } from '../entities/video.entity';

export type UpdateVideoDto = Pick<
  VideoEntity,
  'videoName' | 'fileName' | 'extension'
>;

import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { VideosModule } from '../src/videos/videos.module';
import { VideosService } from '../src/videos/videos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        VideosModule,
        // Use the e2e_test database to run the tests
        TypeOrmModule.forRoot({
          type: 'mysql' as any,
          host: '95.217.108.112',
          port: 3314,
          username: 'demo',
          password: 'jgwggwbwzanm8nwu',
          database: 'demo',
          entities: ['./**/*.entity.ts'],
          synchronize: true,
        }),
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('GET /api/v1/videos', () => {
    return request(app.getHttpServer())
      .get('/api/v1/videos')
      .expect(200)
      .expect((res) => Array.isArray(res.body));
  });

  it('Should throw an error if file does not exist: GET /api/v1/videos', async () => {
    jest.setTimeout(30000);
    try {
      await app
        .get(VideosService)
        .getVideoFileById('definitely does not exist');
    } catch (err) {
      expect(err).toBeInstanceOf(EntityNotFoundError);
    }
  });
});

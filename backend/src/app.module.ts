import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config, ConfigKeys } from './config/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideosModule } from './videos/videos.module';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
    ConfigModule.forRoot({
      load: [config],
      cache: true,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'mysql' as any,
          host: configService.get<string>(ConfigKeys.DatabaseHost),
          port: configService.get<number>(ConfigKeys.DatabasePort),
          username: configService.get<string>(ConfigKeys.DatabaseUser),
          password: configService.get<string>(ConfigKeys.DatabasePassword),
          database: configService.get<string>(ConfigKeys.DatabaseName),
          entities: [__dirname + '/../**/*.entity.js'],
          synchronize: true,
        };
      },
    }),
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: '/upload',
        storage: {},
      }),
    }),
    VideosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { HashtagModule } from './hashtag/hashtag.module';
import { ConfigModule } from "@nestjs/config";
import { ImageModule } from './image/image.module';
import { TrendModule } from './trend/trend.module';

@Module({
  imports: [
      ConfigModule.forRoot({
        envFilePath: '.env'
      }),
      HashtagModule,
      ImageModule,
      TrendModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

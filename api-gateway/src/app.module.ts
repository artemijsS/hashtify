import { Module } from '@nestjs/common';
import { HashtagModule } from './hashtag/hashtag.module';
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
      ConfigModule.forRoot({
        envFilePath: '.env'
      }),
      HashtagModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { HashtagController } from './hashtag.controller';
import { HashtagService } from './hashtag.service';
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [HttpModule.registerAsync({
    useFactory: () => ({baseURL: process.env.HASHTIFY_URL})
  })],
  controllers: [HashtagController],
  providers: [HashtagService]
})
export class HashtagModule {}

import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [HttpModule.registerAsync({
    useFactory: () => ({baseURL: process.env.IMAGE_URL})
  })],
  controllers: [ImageController],
  providers: [ImageService]
})
export class ImageModule {}

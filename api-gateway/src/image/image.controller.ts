import { Controller, Get, Query } from '@nestjs/common';
import { ImageService } from "./image.service";

@Controller('image')
export class ImageController {

    constructor(private readonly imageService: ImageService) {}

    @Get()
    imageGet(@Query('text') text) {
        return this.imageService.getImage(text);
    }

}

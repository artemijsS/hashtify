import { Controller, Get } from '@nestjs/common';
import { HashtagService } from "./hashtag.service";

@Controller('hashtag')
export class HashtagController {

    constructor(private hashtagService: HashtagService) {}

    @Get()
    helloGet() {
        return this.hashtagService.getHello();
    }
}

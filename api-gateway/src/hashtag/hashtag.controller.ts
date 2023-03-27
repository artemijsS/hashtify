import {Controller, Get, Query} from '@nestjs/common';
import { HashtagService } from "./hashtag.service";

@Controller('hashtag')
export class HashtagController {

    constructor(private readonly hashtagService: HashtagService) {}

    @Get()
    hashtagsGet(@Query('text') text: string) {
        return this.hashtagService.getHashtags(text);
    }
}

import { Controller, Get, Query } from '@nestjs/common';
import { TrendService } from "./trend.service";

@Controller('trend')
export class TrendController {

    constructor(private readonly trendService: TrendService) {}

    @Get()
    imageGet(@Query('text') text) {
        return this.trendService.getTrend(text);
    }

}

import { Module } from '@nestjs/common';
import { TrendService } from './trend.service';
import { TrendController } from './trend.controller';
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [HttpModule.registerAsync({
    useFactory: () => ({baseURL: process.env.TREND_URL})
  })],
  providers: [TrendService],
  controllers: [TrendController]
})
export class TrendModule {}

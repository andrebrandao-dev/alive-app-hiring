import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { HttpModule } from '@nestjs/axios';
import { SearchService } from './services/search.service';
import { QuoteService } from './services/quote.service';
import url from './url_api';
import { HistoryService } from './services/history.service';
import { GainLossService } from './services/gainloss.service';

@Module({
  imports: [
    HttpModule.register({
      baseURL: url,
    }),
  ],
  controllers: [DashboardController],
  providers: [SearchService, QuoteService, HistoryService, GainLossService],
})
export class DashboardModule {}

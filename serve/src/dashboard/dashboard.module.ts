import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { HttpModule } from '@nestjs/axios';
import { SearchService } from './services/search.service';
import { QuoteService } from './services/quote.service';
import url from './url_api';
import { HistoryService } from './services/history.service';

@Module({
  imports: [
    HttpModule.register({
      baseURL: url,
    }),
  ],
  controllers: [DashboardController],
  providers: [SearchService, QuoteService, HistoryService],
})
export class DashboardModule {}

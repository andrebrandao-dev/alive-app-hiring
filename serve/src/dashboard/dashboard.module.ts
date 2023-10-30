import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { HttpModule } from '@nestjs/axios';
import { SearchService } from './services/search.service';
import { QuoteService } from './services/quote.service';
import api from './api';

@Module({
  imports: [
    HttpModule.register({
      baseURL: api,
    }),
  ],
  controllers: [DashboardController],
  providers: [SearchService, QuoteService],
})
export class DashboardModule {}

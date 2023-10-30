import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { HttpModule } from '@nestjs/axios';
import { SearchService } from './services/search.service';
import { QuoteService } from './services/quote.service';
const apikey = 'N4KXLQI4AHXW2N75';

@Module({
  imports: [
    HttpModule.register({
      baseURL: `https://www.alphavantage.co/query?apikey=${apikey}`,
    }),
  ],
  controllers: [DashboardController],
  providers: [SearchService, QuoteService],
})
export class DashboardModule {}

import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { SearchService } from './services/search.service';
import { QuoteService } from './services/quote.service';
import { HistoryService } from './services/history.service';
import { GetHistoryDTO } from './dto/history.dto';

@Controller('dashboard')
export class DashboardController {
  @Inject(SearchService)
  private readonly searchService: SearchService;

  @Inject(QuoteService)
  private readonly quoteService: QuoteService;

  @Inject(HistoryService)
  private readonly historyService: HistoryService;

  @Get('search/:keywords')
  search(@Param('keywords') keywords: string) {
    return this.searchService.execute(keywords);
  }

  @Get('quote/:symbol')
  quote(@Param('symbol') symbol: string) {
    return this.quoteService.execute(symbol);
  }

  @Get('history/:symbol')
  history(@Param('symbol') symbol: string, @Query() query: GetHistoryDTO) {
    const getHistory: GetHistoryDTO = {
      start_date: query.start_date,
      end_date: query.end_date,
    };

    return this.historyService.execute(symbol, getHistory);
  }
}

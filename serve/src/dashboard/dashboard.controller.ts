import { Controller, Get, Inject, Param } from '@nestjs/common';
import { SearchService } from './services/search.service';
import { QuoteService } from './services/quote.service';

@Controller('dashboard')
export class DashboardController {
  @Inject(SearchService)
  private readonly searchService: SearchService;

  @Inject(QuoteService)
  private readonly quoteService: QuoteService;

  @Get('search/:keywords')
  search(@Param('keywords') keywords: string) {
    return this.searchService.execute(keywords);
  }

  @Get('quote/:symbol')
  quote(@Param('symbol') symbol: string) {
    return this.quoteService.execute(symbol);
  }
}

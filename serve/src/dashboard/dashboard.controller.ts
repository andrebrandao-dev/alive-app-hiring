import { Controller, Get, Inject, Param } from '@nestjs/common';
import { SearchService } from './services/search.service';

@Controller('dashboard')
export class DashboardController {
  @Inject(SearchService)
  private readonly searchService: SearchService;

  @Get('search/:keywords')
  search(@Param('keywords') keywords: string) {
    return this.searchService.execute(keywords);
  }

  /* @Get('quote/:symbol')
  quote(@Param('symbol') symbol: string) {
    return this.searchService.execute(symbol);
  } */
}

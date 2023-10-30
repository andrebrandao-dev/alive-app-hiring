import { Test, TestingModule } from '@nestjs/testing';
import { DashboardController } from './dashboard.controller';
import { QuoteService } from './services/quote.service';
import { SearchService } from './services/search.service';
import { SymbolDTO } from './dto/symbol.dto';
import { HttpModule } from '@nestjs/axios';
const apikey = 'N4KXLQI4AHXW2N75';

describe('DashboardController', () => {
  let dashboardController: DashboardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule.register({
          baseURL: `https://www.alphavantage.co/query?apikey=${apikey}`,
        }),
      ],
      controllers: [DashboardController],
      providers: [SearchService, QuoteService],
    }).compile();

    dashboardController = module.get<DashboardController>(DashboardController);
  });

  describe('search', () => {
    it('should return a symbolDTO list', async () => {
      const keywords: string = 'ba';
      const result: SymbolDTO[] = await dashboardController.search(keywords);

      expect(result[0].symbol).toBe('BA');
      expect(result[0].name).toBe('Boeing Company');
      expect(result[0].type).toBe('Equity');
      expect(result[0].region).toBe('United States');
      expect(result[0].marketOpen).toBe('09:30');
      expect(result[0].marketClose).toBe('16:00');
      expect(result[0].timezone).toBe('UTC-04');
      expect(result[0].currency).toBe('USD');
      expect(result[0].matchScore).toBe('1.0000');
    });
  });

  describe('quote', () => {
    it('should return a quoteDTO', async () => {
      const symbol: string = 'BA';
      const result = await dashboardController.quote(symbol);

      expect(result.symbol).toBe('BA');
      expect(result.open).toBe('180.0000');
      expect(result.high).toBe('182.3299');
      expect(result.low).toBe('179.0100');
      expect(result.price).toBe('179.6900');
      expect(result.volume).toBe('4606334');
      expect(result.latestTradingDay).toBe('2023-10-27');
      expect(result.previousClose).toBe('179.0900');
      expect(result.change).toBe('0.6000');
      expect(result.changePercent).toBe('0.3350%');
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { DashboardController } from './dashboard.controller';
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
      providers: [SearchService],
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

  /* describe('quote', () => {
    it('should return a quoteDTO', () => {
      const symbol: string = 'BA';
      const result = dashboardController.quote(symbol);

      expect(result.symbol).toBe('BA');
      expect(result.open).toBe('241.0000');
      expect(result.high).toBe('242.0000');
      expect(result.low).toBe('238.0000');
      expect(result.price).toBe('240.0000');
      expect(result.volume).toBe('123456');
      expect(result.latestTradingDay).toBe('2021-05-21');
      expect(result.previousClose).toBe('239.0000');
      expect(result.change).toBe('1.0000');
      expect(result.changePercent).toBe('0.0042%');
    });
  }); */
});

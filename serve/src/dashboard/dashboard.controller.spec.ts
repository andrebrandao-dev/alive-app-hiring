import { Test, TestingModule } from '@nestjs/testing';
import { DashboardController } from './dashboard.controller';
import { SearchService } from './services/search.service';
import { QuoteService } from './services/quote.service';
import { HistoryService } from './services/history.service';
import { SymbolDTO } from './dto/symbol.dto';
import { HttpModule } from '@nestjs/axios';
import api from './api';
import { GetHistoryDTO } from './dto/history.dto';

describe('DashboardController', () => {
  let dashboardController: DashboardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule.register({
          baseURL: api,
        }),
      ],
      controllers: [DashboardController],
      providers: [SearchService, QuoteService, HistoryService],
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

  describe('history', () => {
    it('should return invalid symbol', async () => {
      const symbol: string = '';
      const getHistory: GetHistoryDTO = {
        start_date: '10-27-2023',
        end_date: '10-27-2023',
      };
      const { response } = await dashboardController.history(
        symbol,
        getHistory,
      );

      expect(response.message).toBe('Symbol should not be empty');
      expect(response.error).toBe('Bad Request');
      expect(response.statusCode).toBe(400);
    });

    it('should return invalid start date', async () => {
      const symbol: string = 'BA';
      const getHistory: GetHistoryDTO = {
        start_date: '27-10-2023',
        end_date: '10-27-2023',
      };
      const { response } = await dashboardController.history(
        symbol,
        getHistory,
      );
      expect(response.message).toBe('Invalid start date');
      expect(response.error).toBe('Bad Request');
      expect(response.statusCode).toBe(400);
    });

    it('should return invalid end date', async () => {
      const symbol: string = 'BA';
      const getHistory: GetHistoryDTO = {
        start_date: '10-27-2023',
        end_date: '27-10-2023',
      };
      const { response } = await dashboardController.history(
        symbol,
        getHistory,
      );

      expect(response.message).toBe('Invalid end date');
      expect(response.error).toBe('Bad Request');
      expect(response.statusCode).toBe(400);
    });

    it('should return a historyDTO list', async () => {
      const symbol: string = 'BA';
      const getHistory: GetHistoryDTO = {
        start_date: '10-27-2023',
        end_date: '10-27-2023',
      };
      const result = await dashboardController.history(symbol, getHistory);

      expect(result[0].date).toBe('2023-10-27');
      expect(result[0].open).toBe('180.0000');
      expect(result[0].high).toBe('182.3299');
      expect(result[0].low).toBe('179.0100');
      expect(result[0].close).toBe('179.6900');
      expect(result[0].volume).toBe('4606334');
    });
  });
});

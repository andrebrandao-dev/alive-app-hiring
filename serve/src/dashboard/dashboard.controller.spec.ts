import { Test, TestingModule } from '@nestjs/testing';
import { DashboardController } from './dashboard.controller';
import { SearchService } from './services/search.service';
import { QuoteService } from './services/quote.service';
import { HistoryService } from './services/history.service';
import { HttpModule } from '@nestjs/axios';
import api from './url_api';
import { GetHistoryDTO } from './dto/history.dto';
import { GetGainLoss } from './dto/gainloss';
import { GainLossService } from './services/gainloss.service';

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
      providers: [SearchService, QuoteService, HistoryService, GainLossService],
    }).compile();

    dashboardController = module.get<DashboardController>(DashboardController);
  });

  describe('search', () => {
    it('should return invalid Keywords must be at least 2 characters', async () => {
      const keywords: string = '';
      const { response } = await dashboardController.search(keywords);

      expect(response.message).toBe('Keywords must be at least 2 characters');
      expect(response.error).toBe('Bad Request');
      expect(response.statusCode).toBe(400);
    });
  });

  describe('quote', () => {
    it('should return symbol is required', async () => {
      const symbol: string = '';
      const { response } = await dashboardController.quote(symbol);

      expect(response.message).toBe('Symbol is required');
      expect(response.error).toBe('Bad Request');
      expect(response.statusCode).toBe(400);
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
  });

  describe('gainloss', () => {
    it('should return invalid symbol', async () => {
      const symbol: string = '';
      const getHistory: GetGainLoss = {
        date_consulting: '10-27-2023',
      };
      const { response } = await dashboardController.gainLoss(
        symbol,
        getHistory,
      );

      expect(response.message).toBe('Symbol should not be empty');
      expect(response.error).toBe('Bad Request');
      expect(response.statusCode).toBe(400);
    });

    it('should return invalid consulting date', async () => {
      const symbol: string = 'BA';
      const getHistory: GetGainLoss = {
        date_consulting: '27-10-2023',
      };
      const { response } = await dashboardController.gainLoss(
        symbol,
        getHistory,
      );

      expect(response.message).toBe('Invalid consulting date');
      expect(response.error).toBe('Bad Request');
      expect(response.statusCode).toBe(400);
    });
  });
});

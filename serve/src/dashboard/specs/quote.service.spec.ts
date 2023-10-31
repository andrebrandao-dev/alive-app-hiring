import { Test, TestingModule } from '@nestjs/testing';
import { QuoteService } from '../services/quote.service';
import { HttpModule } from '@nestjs/axios';
import api from '../url_api';

describe('QuoteService', () => {
  let quoteService: QuoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule.register({
          baseURL: api,
        }),
      ],
      providers: [QuoteService],
    }).compile();

    quoteService = module.get<QuoteService>(QuoteService);
  });

  describe('quote', () => {
    it('should method be defined', async () => {
      const methodSpy = jest.spyOn(quoteService, 'execute');
      expect(methodSpy).toBeDefined();
    });

    it('should method be called', async () => {
      const methodSpy = jest.spyOn(quoteService, 'execute');
      await quoteService.execute('BA');
      expect(methodSpy).toBeCalled();
    });

    it('should be reject by symbol is required', async () => {
      await expect(quoteService.execute('')).rejects.toThrow(
        'Symbol is required',
      );
    });

    it('should be reject by expired api key', async () => {
      await expect(quoteService.execute('BA')).rejects.toThrow(
        'Apikey limit reached',
      );
    });
  });
});

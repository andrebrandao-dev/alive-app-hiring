import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/axios';
import api from '../url_api';
import { GainLossService } from '../services/gainloss.service';
import * as moment from 'moment';

describe('GainLossService', () => {
  let gainLossService: GainLossService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule.register({
          baseURL: api,
        }),
      ],
      providers: [GainLossService],
    }).compile();

    gainLossService = module.get<GainLossService>(GainLossService);
  });
  describe('gainloss', () => {
    it('should method be defined', async () => {
      const methodSpy = jest.spyOn(gainLossService, 'execute');
      expect(methodSpy).toBeDefined();
    });

    it('should method be called', async () => {
      const methodSpy = jest.spyOn(gainLossService, 'execute');
      await gainLossService.execute('BA', { date_consulting: '10-27-2023' });
      expect(methodSpy).toBeCalled();
    });

    it('should be reject by symbol is required', async () => {
      await expect(
        gainLossService.execute('', { date_consulting: '10-27-2023' }),
      ).rejects.toThrow('Symbol is required');
    });

    it('should be reject by invalid consulting date', async () => {
      await expect(
        gainLossService.execute('BA', { date_consulting: '27-10-2023' }),
      ).rejects.toThrow('Invalid consulting date');
    });

    it('should be reject by consulting date greater than today', async () => {
      const tomorrow = moment().add(1, 'days').format('MM-DD-YYYY');
      await expect(
        gainLossService.execute('BA', { date_consulting: tomorrow }),
      ).rejects.toThrow('Consulting date should be greater than today');
    });

    it('should be reject by expired api key', async () => {
      await expect(
        gainLossService.execute('BA', { date_consulting: '27-10-2023' }),
      ).rejects.toThrow('Apikey limit reached');
    });
  });
});

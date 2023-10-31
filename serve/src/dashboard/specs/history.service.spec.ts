import { Test, TestingModule } from '@nestjs/testing';
import { HistoryService } from '../services/history.service';
import { HttpModule } from '@nestjs/axios';
import api from '../url_api';
import { GetHistoryDTO } from '../dto/history.dto';
import * as moment from 'moment';

describe('HistoryService', () => {
  let historyService: HistoryService;
  const validDates: GetHistoryDTO = {
    start_date: '10-27-2023',
    end_date: '10-27-2023',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule.register({
          baseURL: api,
        }),
      ],
      providers: [HistoryService],
    }).compile();

    historyService = module.get<HistoryService>(HistoryService);
  });

  describe('history', () => {
    it('should method be defined', async () => {
      const methodSpy = jest.spyOn(historyService, 'execute');
      expect(methodSpy).toBeDefined();
    });

    it('should method be called', async () => {
      const methodSpy = jest.spyOn(historyService, 'execute');
      await historyService.execute('BA', validDates);
      expect(methodSpy).toBeCalled();
    });

    it('should be reject by invalid symbol', async () => {
      await expect(historyService.execute('', validDates)).rejects.toThrow(
        'Symbol should not be empty',
      );
    });

    it('should be reject by invalid date start', async () => {
      const invalidaStartDate: GetHistoryDTO = {
        start_date: '27-10-2023',
        end_date: '10-27-2023',
      };
      await expect(
        historyService.execute('BA', invalidaStartDate),
      ).rejects.toThrow('Invalid start date');
    });

    it('should be reject by invalid date end', async () => {
      const invalidaEndDate: GetHistoryDTO = {
        start_date: '10-27-2023',
        end_date: '27-10-2023',
      };
      await expect(
        historyService.execute('BA', invalidaEndDate),
      ).rejects.toThrow('Invalid end date');
    });

    it('should be reject by date end cannot be greater than start date', async () => {
      const dateEndGreaterThanStart: GetHistoryDTO = {
        start_date: '10-27-2023',
        end_date: '10-28-2023',
      };
      await expect(
        historyService.execute('BA', dateEndGreaterThanStart),
      ).rejects.toThrow('End date cannot be greater than start date');
    });

    it('should be reject by date start cannot be greater than today', async () => {
      const tomorrow = moment().add(1, 'days').format('MM-DD-YYYY');
      const dateEndGreaterThanStart: GetHistoryDTO = {
        start_date: tomorrow,
        end_date: '10-20-2023',
      };
      await expect(
        historyService.execute('BA', dateEndGreaterThanStart),
      ).rejects.toThrow('Start date cannot be greater than today');
    });

    it('should be reject by expired api key', async () => {
      await expect(historyService.execute('BA', validDates)).rejects.toThrow(
        'Apikey limit reached',
      );
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { SearchService } from '../services/search.service';
import { HttpModule } from '@nestjs/axios';
import api from '../url_api';

describe('SearchService', () => {
  let searchService: SearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule.register({
          baseURL: api,
        }),
      ],
      providers: [SearchService],
    }).compile();

    searchService = module.get<SearchService>(SearchService);
  });

  describe('search', () => {
    it('should method be defined', async () => {
      const methodSpy = jest.spyOn(searchService, 'execute');
      expect(methodSpy).toBeDefined();
    });

    it('should method be called', async () => {
      const methodSpy = jest.spyOn(searchService, 'execute');
      await searchService.execute('BA');
      expect(methodSpy).toBeCalled();
    });

    it('should be reject by keyword not be at least 2 characters', async () => {
      await expect(searchService.execute('')).rejects.toThrow(
        'Keywords must be at least 2 characters',
      );
    });

    it('should be reject by expired api key', async () => {
      await expect(searchService.execute('BA')).rejects.toThrow(
        'Apikey limit reached',
      );
    });
  });
});

import { BadRequestException, Injectable } from '@nestjs/common';
import { SymbolDTO } from '../dto/symbol.dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class SearchService {
  constructor(private readonly httpService: HttpService) {}

  async execute(keywords: string): Promise<any> {
    if (keywords.length < 2) {
      throw new BadRequestException('Keywords must be at least 2 characters');
    }

    const response = await this.httpService.axiosRef.get(
      `&function=SYMBOL_SEARCH&keywords=${keywords}`,
    );

    if (
      response.data.Information &&
      response.data.Information.startsWith('Thank you for using Alpha Vantage!')
    ) {
      throw new BadRequestException('Apikey limit reached');
    }

    const symbols: SymbolDTO[] = response.data.bestMatches.map(
      (element: any) => new SymbolDTO(element),
    );

    return symbols.slice(0, 10);
  }
}

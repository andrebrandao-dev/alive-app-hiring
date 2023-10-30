import { Injectable } from '@nestjs/common';
import { SymbolDTO } from '../dto/symbol.dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class SearchService {
  constructor(private readonly httpService: HttpService) {}

  async execute(keywords: string): Promise<SymbolDTO[]> {
    const response = await this.httpService.axiosRef.get(
      `&function=SYMBOL_SEARCH&keywords=${keywords}`,
    );
    const symbols: SymbolDTO[] = [];

    response.data.bestMatches.forEach((element: any) => {
      symbols.push({
        symbol: element['1. symbol'],
        name: element['2. name'],
        type: element['3. type'],
        region: element['4. region'],
        marketOpen: element['5. marketOpen'],
        marketClose: element['6. marketClose'],
        timezone: element['7. timezone'],
        currency: element['8. currency'],
        matchScore: element['9. matchScore'],
      });
    });

    return symbols;
  }
}

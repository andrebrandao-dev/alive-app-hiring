import { Injectable } from '@nestjs/common';
import { SymbolDTO } from '../dto/symbol.dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class SearchService {
  constructor(private readonly httpService: HttpService) {}

  execute(keywords: string): SymbolDTO[] {
    console.log(keywords);
    /* const response = await this.httpService.axiosRef.get(
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
    }); */

    const symbols: SymbolDTO[] = [
      {
        symbol: 'BA',
        name: 'Boeing Company',
        type: 'Equity',
        region: 'United States',
        marketOpen: '09:30',
        marketClose: '16:00',
        timezone: 'UTC-04',
        currency: 'USD',
        matchScore: '1.0000',
      },
    ];

    return symbols;
  }
}

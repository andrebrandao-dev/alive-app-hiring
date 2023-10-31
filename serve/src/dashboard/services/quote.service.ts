import { BadRequestException, Injectable } from '@nestjs/common';
import { QuoteDTO } from '../dto/quote.dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class QuoteService {
  constructor(private readonly httpService: HttpService) {}

  async execute(symbol: string): Promise<any> {
    if (symbol === '') {
      return new BadRequestException('Symbol is required');
    }

    const response = await this.httpService.axiosRef.get(
      `&function=GLOBAL_QUOTE&symbol=${symbol}`,
    );

    if (
      response.data.Information &&
      response.data.Information.startsWith('Thank you for using Alpha Vantage!')
    ) {
      return new BadRequestException('Apikey limit reached');
    }

    const quote = new QuoteDTO(response.data['Global Quote']);
    return quote;
  }
}

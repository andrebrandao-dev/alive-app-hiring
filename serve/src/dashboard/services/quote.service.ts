import { Injectable } from '@nestjs/common';
import { QuoteDTO } from '../dto/quote.dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class QuoteService {
  constructor(private readonly httpService: HttpService) {}

  async execute(symbol: string): Promise<QuoteDTO> {
    const response = await this.httpService.axiosRef.get(
      `&function=GLOBAL_QUOTE&symbol=${symbol}`,
    );

    const quote = new QuoteDTO({
      symbol: response.data['Global Quote']['01. symbol'],
      open: response.data['Global Quote']['02. open'],
      high: response.data['Global Quote']['03. high'],
      low: response.data['Global Quote']['04. low'],
      price: response.data['Global Quote']['05. price'],
      volume: response.data['Global Quote']['06. volume'],
      latestTradingDay: response.data['Global Quote']['07. latest trading day'],
      previousClose: response.data['Global Quote']['08. previous close'],
      change: response.data['Global Quote']['09. change'],
      changePercent: response.data['Global Quote']['10. change percent'],
    });

    return quote;
  }
}

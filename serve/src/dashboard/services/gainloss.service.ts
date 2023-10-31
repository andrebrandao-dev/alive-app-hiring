import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { GainLossDTO, GetGainLoss } from '../dto/gainloss';
import * as moment from 'moment';

@Injectable()
export class GainLossService {
  constructor(private readonly httpService: HttpService) {}

  async execute(symbol: string, query: GetGainLoss): Promise<any> {
    if (symbol === '') {
      throw new BadRequestException('Symbol is required');
    }

    const date = moment(query.date_consulting, 'MM-DD-YYYY');
    if (!date.isValid()) {
      throw new BadRequestException('Invalid consulting date');
    }

    if (date.isAfter(moment())) {
      throw new BadRequestException(
        'Consulting date should be greater than today',
      );
    }

    const [consulting, current] = await Promise.all([
      this.httpService.axiosRef.get(
        `&function=TIME_SERIES_DAILY&symbol=${symbol}`,
      ),
      this.httpService.axiosRef.get(`&function=GLOBAL_QUOTE&symbol=${symbol}`),
    ]);

    if (
      this.checkApikeyLimitReached(consulting) ||
      this.checkApikeyLimitReached(current)
    ) {
      return new BadRequestException('Apikey limit reached');
    }

    const gainLoss = new GainLossDTO(
      current.data['Global Quote']['05. price'],
      consulting.data['Time Series (Daily)'][date.format('YYYY-MM-DD')][
        '4. close'
      ],
    );

    return gainLoss;
  }

  checkApikeyLimitReached(response: any) {
    return (
      response.data.Information &&
      response.data.Information.startsWith('Thank you for using Alpha Vantage!')
    );
  }
}

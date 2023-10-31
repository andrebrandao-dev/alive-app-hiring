import * as moment from 'moment';
import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { GetHistoryDTO, HistoryDTO } from '../dto/history.dto';

@Injectable()
export class HistoryService {
  constructor(private readonly httpService: HttpService) {}

  async execute(symbol: string, getHistory: GetHistoryDTO): Promise<any> {
    const startDate = moment(getHistory.start_date, 'MM-DD-YYYY');
    const endDate = moment(getHistory.end_date, 'MM-DD-YYYY');

    if (symbol === '') {
      return new BadRequestException('Symbol should not be empty');
    }

    if (!startDate.isValid()) {
      return new BadRequestException('Invalid start date');
    }

    if (!endDate.isValid()) {
      return new BadRequestException('Invalid end date');
    }

    if (endDate > startDate) {
      return new BadRequestException(
        'End date cannot be greater than start date',
      );
    }

    if (startDate > moment()) {
      return new BadRequestException('Start date cannot be greater than today');
    }

    const response = await this.httpService.axiosRef.get(
      `&function=TIME_SERIES_DAILY&symbol=${symbol}`,
    );

    if (
      response.data.Information &&
      response.data.Information.startsWith('Thank you for using Alpha Vantage!')
    ) {
      console.log(response.data.Information);
      return new BadRequestException('Apikey limit reached');
    }

    const dates = response.data['Time Series (Daily)'];

    console.log(dates);

    const filteredDates = Object.entries(dates)
      .filter(
        ([date]) =>
          moment(date, 'YYYY-MM-DD') <= startDate &&
          moment(date, 'YYYY-MM-DD') >= endDate,
      )
      .map(([date, values]) => ({
        date: moment(date, 'YYYY-MM-DD').format('MM-DD-YYYY'),
        open: values['1. open'],
        high: values['2. high'],
        low: values['3. low'],
        close: values['4. close'],
        volume: values['5. volume'],
      }));

    return filteredDates.map((date) => new HistoryDTO(date));
  }
}

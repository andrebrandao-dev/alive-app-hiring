import * as moment from 'moment';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { GetHistoryDTO, HistoryDTO } from '../dto/history.dto';

@Injectable()
export class HistoryService {
  constructor(private readonly httpService: HttpService) {}

  async execute(symbol: string, getHistory: GetHistoryDTO): Promise<any> {
    const response = await this.httpService.axiosRef.get(
      `&function=TIME_SERIES_DAILY&symbol=${symbol}`,
    );
    console.log(getHistory.start_date, getHistory.end_date);

    const startDate = moment(getHistory.start_date, 'MM/DD/YYYY');
    const endDate = moment(getHistory.end_date, 'MM/DD/YYYY');

    const dates = response.data['Time Series (Daily)'];

    const filteredDates = Object.entries(dates)
      .filter(
        ([date]) =>
          moment(date, 'YYYY-MM-DD') >= startDate &&
          moment(date, 'YYYY-MM-DD') <= endDate,
      )
      .map(([date, values]) => ({
        date,
        open: values['1. open'],
        high: values['2. high'],
        low: values['3. low'],
        close: values['4. close'],
        volume: values['5. volume'],
      }));

    return filteredDates.map((date) => new HistoryDTO(date));
  }
}

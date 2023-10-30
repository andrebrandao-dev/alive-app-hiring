import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

export interface IDashboardInterface {
  search(keywords: string): Promise<any>;
}

@Injectable()
export class IDashboard implements IDashboardInterface {
  constructor(private readonly httpService: HttpService) {}

  async search(keywords: string): Promise<any> {
    return await this.httpService.axiosRef.get(
      `&function=SYMBOL_SEARCH&keywords=${keywords}`,
    );
  }
}

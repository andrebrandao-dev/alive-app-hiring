import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { SearchService } from './services/search.service';
import { HttpModule } from '@nestjs/axios';
const apikey = 'N4KXLQI4AHXW2N75';

@Module({
  imports: [
    HttpModule.register({
      baseURL: `https://www.alphavantage.co/query?apikey=${apikey}`,
    }),
  ],
  controllers: [DashboardController],
  providers: [SearchService],
})
export class DashboardModule {}

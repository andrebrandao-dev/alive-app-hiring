type QuoteData = {
  '01. symbol': string;
  '02. open': string;
  '03. high': string;
  '04. low': string;
  '05. price': string;
  '06. volume': string;
  '07. latest trading day': string;
  '08. previous close': string;
  '09. change': string;
  '10. change percent': string;
};

export class QuoteDTO {
  symbol: string;
  open: string;
  high: string;
  low: string;
  price: string;
  volume: string;
  latestTradingDay: string;
  previousClose: string;
  change: string;
  changePercent: string;

  constructor(data: QuoteData) {
    this.symbol = data['01. symbol'];
    this.open = data['02. open'];
    this.high = data['03. high'];
    this.low = data['04. low'];
    this.price = data['05. price'];
    this.volume = data['06. volume'];
    this.latestTradingDay = data['07. latest trading day'];
    this.previousClose = data['08. previous close'];
    this.change = data['09. change'];
    this.changePercent = data['10. change percent'];
  }
}

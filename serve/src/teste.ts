type MatchData = {
  '1. symbol': string;
  '2. name': string;
  '3. type': string;
  '4. region': string;
  '5. marketOpen': string;
  '6. marketClose': string;
  '7. timezone': string;
  '8. currency': string;
  '9. matchScore': string;
};

export class Match {
  symbol: string;
  name: string;
  type: string;
  region: string;
  marketOpen: string;
  marketClose: string;
  timezone: string;
  currency: string;
  matchScore: string;

  constructor(data: MatchData) {
    this.symbol = data['1. symbol'];
    this.name = data['2. name'];
    this.type = data['3. type'];
    this.region = data['4. region'];
    this.marketOpen = data['5. marketOpen'];
    this.marketClose = data['6. marketClose'];
    this.timezone = data['7. timezone'];
    this.currency = data['8. currency'];
    this.matchScore = data['9. matchScore'];
  }
}

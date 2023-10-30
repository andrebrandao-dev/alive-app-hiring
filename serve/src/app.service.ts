import { Injectable } from '@nestjs/common';
import { Match } from './teste';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getTest(): any {
    const JSONResponse = {
      bestMatches: [
        {
          '1. symbol': 'IBM',
          '2. name': 'International Business Machines Corp',
          '3. type': 'Equity',
          '4. region': 'United States',
          '5. marketOpen': '09:30',
          '6. marketClose': '16:00',
          '7. timezone': 'UTC-04',
          '8. currency': 'USD',
          '9. matchScore': '1.0000',
        },
      ],
    };
    const match = new Match(JSONResponse.bestMatches[0]);
    return match;
  }
}

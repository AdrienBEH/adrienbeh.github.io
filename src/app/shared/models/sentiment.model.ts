import { SentimentResponse } from './finnhub.model';
import { DateTime } from 'luxon';

export class Sentiment {
  change: number; // Net buying/selling from all insiders' transactions.
  mspr: number; // Monthly share purchase ratio.
  symbol: string; // Symbol.
  date: DateTime; // Date.

  constructor(sentiment: I_Sentiment) {
    this.change = sentiment.change;
    this.mspr = sentiment.mspr;
    this.symbol = sentiment.symbol;
    this.date = sentiment.date;
  }

  static parse(sentimentResponse: SentimentResponse): Sentiment {
    return new Sentiment({
      change: sentimentResponse.change,
      mspr: sentimentResponse.mspr,
      symbol: sentimentResponse.symbol,
      date: DateTime.fromObject({
        month: sentimentResponse.month,
        year: sentimentResponse.year,
      }),
    });
  }
}

interface I_Sentiment {
  change: number; // Net buying/selling from all insiders' transactions.
  mspr: number; // Monthly share purchase ratio.
  symbol: string; // Symbol.
  date: DateTime; // Date.
}

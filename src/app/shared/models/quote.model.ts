import { QuoteResponse } from './finnhub.model';

export class Quote {
  c: number;  // Current price
  d: number;  // Change
  dp: number; // Percent change
  h: number;  // High price of the day
  l: number;  // Low price of the day
  o: number;  // Open price of the day
  pc: number; //  Previous close price

  constructor(quote: I_Quote) {
    this.c = quote.c;
    this.d = quote.d;
    this.dp = quote.dp;
    this.h = quote.h;
    this.l = quote.l;
    this.o = quote.o;
    this.pc = quote.pc;
  }

  static parse(finnhubQuote: QuoteResponse): Quote {
    return new Quote({
      c: finnhubQuote.c,
      d: finnhubQuote.d / 100,  // Fix cause unsuitable Finnhub API format value.
      dp: finnhubQuote.dp,
      h: finnhubQuote.h,
      l: finnhubQuote.l,
      o: finnhubQuote.o,
      pc: finnhubQuote.c,
    });
  }

  static json(quote: Quote): QuoteResponse {
    return {
      c: quote.c,
      d: quote.d * 100,        // Fix cause unsuitable Finnhub API format value.
      dp: quote.dp,
      h: quote.h,
      l: quote.l,
      o: quote.o,
      pc: quote.pc,
    };
  }
}

export interface I_Quote {
  c: number;  // Current price
  d: number;  // Change
  dp: number; // Percent change
  h: number;  // High price of the day
  l: number;  // Low price of the day
  o: number;  // Open price of the day
  pc: number; //  Previous close price
}

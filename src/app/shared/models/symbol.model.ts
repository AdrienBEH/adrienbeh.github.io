import { SymbolResponse } from './finnhub.model';
import { I_Quote, Quote } from './quote.model';

export class StockSymbol {
  description: string; // Symbol description
  displaySymbol: string; // Display symbol name.
  symbol: string; // Unique symbol used to identify this symbol used in /stock/candle endpoint.
  type: string; // Security type.
  quote: Quote | undefined;

  constructor(stockSymbol: I_StockSymbol) {
    this.description = stockSymbol.description;
    this.displaySymbol = stockSymbol.displaySymbol;
    this.symbol = stockSymbol.symbol;
    this.type = stockSymbol.type;
    this.quote = stockSymbol.quote;
  }

  static parse(finnhubSymbolResponse: SymbolResponse): StockSymbol {
    return new StockSymbol({
      description: finnhubSymbolResponse.description,
      displaySymbol: finnhubSymbolResponse.displaySymbol,
      symbol: finnhubSymbolResponse.symbol,
      type: finnhubSymbolResponse.type,
      quote: finnhubSymbolResponse.quote ? Quote.parse(finnhubSymbolResponse.quote) : undefined,
    });
  }

  static json(stockSymbol: StockSymbol): SymbolResponse {
    return {
      description: stockSymbol.description,
      displaySymbol: stockSymbol.displaySymbol,
      symbol: stockSymbol.symbol,
      type: stockSymbol.type,
      quote: stockSymbol.quote ? Quote.json(stockSymbol.quote) : undefined,
    };
  }
}

interface I_StockSymbol {
  description: string; // Symbol description
  displaySymbol: string; // Display symbol name.
  symbol: string; // Unique symbol used to identify this symbol used in /stock/candle endpoint.
  type: string; // Security type.
  quote?: I_Quote;
}

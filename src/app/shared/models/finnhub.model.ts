/**
 * Finnhub API response used for SymbolResponse wrapping.
 */
export interface ResponseA<T> {
  count: number; // Number of results.
  result: T[]; // Array of search results.
}

/**
 * Finnhub API response used for SentimentResponse wrapping.
 */
export interface ResponseB<T> {
  symbol: string; // Number of results.
  data: T[]; // Array of search results.
}

/**
 * {@link https://finnhub.io/docs/api/quote| Finnhub quote documentation}
 */
export interface QuoteResponse {
  c: number; // Current price
  d: number; // Change
  dp: number; // Percent change
  h: number; // High price of the day
  l: number; // Low price of the day
  o: number; // Open price of the day
  pc: number; //  Previous close price
}

/**
 * {@link https://finnhub.io/docs/api/symbol-search| Finnhub symbol documentation}
 */
export interface SymbolResponse {
  description: string; // Symbol description
  displaySymbol: string; // Display symbol name.
  symbol: string; // Unique symbol used to identify this symbol used in /stock/candle endpoint.
  type: string; // Security type.
  quote?: QuoteResponse;
}

/**
 * {@link https://finnhub.io/docs/api/insider-sentiment| Finnhub sentiment documentation}
 */
export interface SentimentResponse {
  change: number; // Net buying/selling from all insiders' transactions.
  month: number; // Month.
  mspr: number; // Monthly share purchase ratio.
  symbol: string; // Symbol.
  year: number; // Year.
}

import { Injectable } from '@angular/core';

import { catchError, map, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Sentiment, Quote, StockSymbol } from '../../shared/models';
import { DateTime } from 'luxon';
import * as FModels from '../../shared/models/finnhub.model';
import { SnackbarNotificationService } from 'src/app/shared/components/snackbar-notification/snackbar-notification.service';

@Injectable({ providedIn: 'root' })
export class FinnhubService {
  private FINNHUB_URL: string = 'https://finnhub.io/api/v1';

  constructor(
    private httpClient: HttpClient,
    private snackbarNotificationService: SnackbarNotificationService,
  ) {}

  /**
   * {@link https://finnhub.io/docs/api/insider-sentiment| Finnhub sentiment documentation}
   */
  public getSentiments(
    symbol: string,
    from: DateTime,
    to: DateTime
  ): Observable<Sentiment[]> {
    const params: HttpParams = new HttpParams().appendAll({
      symbol,
      from: from.toISO().substring(0, 10), // Get ISO string like YYYY-MM.
      to: to.toISO().substring(0, 10), // Get ISO string like YYYY-MM.
    });
    return this.httpClient
      .get<FModels.ResponseB<FModels.SentimentResponse>>(
        `${this.FINNHUB_URL}/stock/insider-sentiment`,
        { params }
      )
      .pipe(
        map((response: FModels.ResponseB<FModels.SentimentResponse>) => response.data),
        map((sentiments: FModels.SentimentResponse[]) =>
          sentiments.map((sentiment) => Sentiment.parse(sentiment))
        ),
      );
  }

  /**
   * {@link https://finnhub.io/docs/api/quote| Finnhub quote documentation}
   */
   public getQuote(symbol: string): Observable<Quote> {
    const params: HttpParams = new HttpParams().appendAll({
      symbol,
    });
    return this.httpClient
      .get<FModels.QuoteResponse>(`${this.FINNHUB_URL}/quote`, { params })
      .pipe(
        catchError((httpErrorResponse: HttpErrorResponse, quote: Observable<FModels.QuoteResponse>) => {
          if (httpErrorResponse instanceof HttpErrorResponse) {
            this.snackbarNotificationService.openSnackBar({
              icon: 'error',
              message: `${httpErrorResponse.status}: ${httpErrorResponse.error.error}`,
              type: 'ERROR',
              duration: 3000,
            });
            throw httpErrorResponse;
          }
          return quote;
        }),
        map((quote: FModels.QuoteResponse) => Quote.parse(quote))
      );
  }

  /**
   * {@link https://finnhub.io/docs/api/symbol-search| Finnhub symbol documentation}
   */
  public getSymbols(
    filter: string
  ): Observable<{ count: number; symbols: StockSymbol[] }> {
    const params: HttpParams = new HttpParams().appendAll({
      q: filter,
    });
    return this.httpClient
      .get<FModels.ResponseA<FModels.SymbolResponse>>(
        `${this.FINNHUB_URL}/search`,
        { params }
      )
      .pipe(
        map((response: FModels.ResponseA<FModels.SymbolResponse>) => {
          return {
            count: response.count,
            symbols: response.result.map((symbol: FModels.SymbolResponse) =>
              StockSymbol.parse(symbol)
            ),
          };
        })
      );
  }
}

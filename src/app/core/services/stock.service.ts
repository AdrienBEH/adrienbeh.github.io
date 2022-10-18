import { Injectable } from '@angular/core';
import { remove } from 'lodash';
import { BehaviorSubject, Observable, map, filter, tap, of, mergeMap } from 'rxjs';
import { Quote, StockSymbol } from 'src/app/shared';
import { SnackbarNotificationService } from 'src/app/shared/components/snackbar-notification/snackbar-notification.service';
import { FinnhubService } from '.';

@Injectable({ providedIn: 'root' })
export class StockService {
  private _stock$: BehaviorSubject<StockSymbol[]>;
  public stock$: Observable<StockSymbol[]>;

  constructor(
    private finnhubService: FinnhubService,
    private snackbarNotificationService: SnackbarNotificationService,
  ) {
    this._stock$ = new BehaviorSubject<StockSymbol[]>(this.stocked());
    this.stock$ = this._stock$.asObservable();
  }
  
  private stocked(): StockSymbol[] {
    return Object.values(localStorage).map((localSymbol: string) => StockSymbol.parse(JSON.parse(localSymbol)))
  }

  public add(symbol: StockSymbol): Observable<StockSymbol | undefined> {
    const symbols: StockSymbol[] = Array.from(this._stock$.value);
    return of(symbol).pipe(
      mergeMap((symbol: StockSymbol) => {
        if (this.has(symbol)) {
          this.snackbarNotificationService.openSnackBar({
            icon: 'error',
            message: `${symbol.symbol} already stocked!`,
            type: 'ERROR',
            duration: 3000,
          })
          return of();
        }
        return this.finnhubService.getQuote(symbol.symbol).pipe(
          map((quote: Quote) => {
            symbol.quote = quote;
            return symbol;
          }),
          tap((symbol: StockSymbol) => {
            symbols.push(symbol);
            this._stock$.next(symbols);
            this.stock(symbol);
          }),
        )
      }),
    );
  }

  public has(symbol: StockSymbol | string): StockSymbol | undefined {
    if (symbol instanceof StockSymbol) {
      return this._stock$.value.find((stockedSymbol: StockSymbol) => stockedSymbol.symbol.toLocaleUpperCase() === symbol.symbol.toLocaleUpperCase());
    }
    return this._stock$.value.find((stockedSymbol: StockSymbol) => stockedSymbol.symbol.toLocaleUpperCase() === symbol.toLocaleUpperCase());
  }

  private stock(symbol: StockSymbol): void {
    localStorage.setItem(symbol.symbol, JSON.stringify(StockSymbol.json(symbol)));
  }

  private unstock(symbol: StockSymbol): void {
    localStorage.removeItem(symbol.symbol);
  }

  public remove(symbol: StockSymbol): void {
    if (!this.has(symbol)) return;
    this.unstock(symbol);
    const symbols: StockSymbol[] = Array.from(this._stock$.value);
    remove(symbols, (stockedSymbol: StockSymbol) => {
      return stockedSymbol === symbol;
    });
    this._stock$.next(symbols);
  }
}

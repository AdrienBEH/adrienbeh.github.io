import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, switchMap, tap, of, filter, finalize, timer, last } from 'rxjs';
import { FinnhubService, StockService } from '../core/services';
import { StockSymbol } from '../shared/models';
import { sortByCustomKey } from '../shared/utils';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { ClassValidatorDirective } from '../shared/directives/class-validator.directive';

@Component({
  selector: 'app-symbols',
  templateUrl: 'symbols.component.html',
  styleUrls: ['symbols.component.scss'],
})
export class SymbolsComponent implements OnInit {
  symbolControl = new FormControl<string | StockSymbol>('', [ClassValidatorDirective.reactive(StockSymbol)]);
  filteredSymbols$: Observable<{ count: number; symbols: StockSymbol[] }>;
  filteredSymbolsCount: number | undefined;
  symbols$: Observable<StockSymbol[]>;
  symbolsLoading: boolean = false;
  trackLoading: boolean = false; 

  constructor(
    private finnhubService: FinnhubService,
    private stockService: StockService,
    private asyncPipe: AsyncPipe,
    private router: Router,
  ) {}

  ngOnInit() {
    this.filteredSymbols$ = this.symbolControl.valueChanges.pipe(
      filter((value: string | StockSymbol | null) => !(value instanceof StockSymbol)),
      tap(() => this.symbolsLoading = true),
      switchMap((value: string | StockSymbol | null) => {
        if (value === '') return of({count: 0, symbols: []});
        return timer(700).pipe(
          last(),
          switchMap(() => this.finnhubService.getSymbols(value as string)),
        )
      }),
      tap((response: {count: number; symbols: StockSymbol[];}) => sortByCustomKey<StockSymbol>(response.symbols, 'symbol')),
      tap({next: (response: {count: number; symbols: StockSymbol[];}) => {
        this.filteredSymbolsCount = response.count || undefined;
        this.symbolsLoading = false;
      }}),
    );
    this.symbols$ = this.stockService.stock$;
  }

  displayFn(symbol: StockSymbol): string {
    return symbol.symbol;
  }

  trackStockSymbol(): void {
    this.trackLoading = true;
    if (this.symbolControl.value instanceof StockSymbol) {
      this.asyncPipe.transform(
        this.stockService.add(this.symbolControl.value)
        .pipe(
          finalize(() => this.trackLoading = false)
        )
      );
    }
  }

  symbolDetail(symbol: StockSymbol): void {
    this.router.navigate(['sentiment', symbol.symbol]);
  }

  symbolUnstock(symbol: StockSymbol): void {
    this.stockService.remove(symbol);
  }

  trackBySymbol(index: number, symbol: StockSymbol): string {
    return symbol.symbol
  }
}

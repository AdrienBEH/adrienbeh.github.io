import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize, Observable, takeLast, tap } from 'rxjs';
import { FinnhubService, StockService } from '../core/services';
import { Sentiment, StockSymbol } from '../shared/models';
import { DateTime } from 'luxon';
import { SnackbarNotificationService } from '../shared/components/snackbar-notification/snackbar-notification.service';

@Component({
  selector: 'app-sentiment',
  templateUrl: 'sentiment.component.html',
  styleUrls: ['sentiment.component.scss'],
})
export class SentimentComponent implements OnInit {
  public sentiments$: Observable<Sentiment[]>;
  public symbol: StockSymbol;
  public sentimentsLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private finnhubService: FinnhubService,
    private stockService: StockService,
    private snackbarNotificationService: SnackbarNotificationService
  ) {
    this.symbol = this.stockService.has(this.route.snapshot.paramMap.get('symbol') as string) as StockSymbol; // Values can't be of another type thanks to SymbolGuard.
  }

  ngOnInit() {
    const symbol: string = this.route.snapshot.paramMap.get('symbol') as string;
    this.sentiments$ = this.finnhubService.getSentiments(
      symbol,
      DateTime.now().minus({ year: 7 }),
      DateTime.now()
    ).pipe(
      tap({next: (sentiments: Sentiment[]) => {
        if (sentiments.length === 0) {
          this.snackbarNotificationService.openSnackBar({
            icon: 'motion_photos_off',
            message: `No sentiments found for this symbol.`,
            type: 'INFO',
            duration: 3000,
          });
        }
      }}),
      takeLast(3),
      finalize(() => this.sentimentsLoading = false),
    )
  }
}

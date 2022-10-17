import { Component, Input, Output, EventEmitter } from '@angular/core';
import { StockSymbol } from '../../models';

@Component({
  selector: 'app-symbol',
  templateUrl: 'symbol.component.html',
  styleUrls: ['symbol.component.scss'],
})
export class SymbolComponent {
  @Input() symbol: StockSymbol;
  @Output('detailRequest') detailEmitter = new EventEmitter<StockSymbol>();
  @Output('unstockRequest') unstockEmitter = new EventEmitter<StockSymbol>();

  constructor() {}

  public detailRequest(): void {
    this.detailEmitter.emit(this.symbol);
  }
  
  public unstockRequest(): void {
    this.unstockEmitter.emit(this.symbol);
  }
}

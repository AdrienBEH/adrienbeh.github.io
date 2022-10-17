import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SymbolComponent } from './symbol.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
  ],
  declarations: [SymbolComponent],
  exports: [SymbolComponent]
})
export class SymbolModule {}

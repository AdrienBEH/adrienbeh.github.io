import { AsyncPipe, CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SymbolsRoutingModule } from './symbols-routing.module';
import { SymbolsComponent } from './symbols.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule} from '@angular/material/input';
import { FinnhubService, StockService } from '../core/services';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SymbolModule, PipesModule, DirectivesModule } from '../shared';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SymbolsRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatBadgeModule,
    MatButtonModule,
    SymbolModule,
    DirectivesModule,
    MatProgressSpinnerModule,
    PipesModule,
  ],
  declarations: [SymbolsComponent],
  providers: [
    FinnhubService,
    StockService,
    AsyncPipe
  ],
})
export class SymbolsModule {}

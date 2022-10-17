import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SentimentComponent } from './sentiment.component';
import { SentimentRoutingModule } from './sentiment-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { DirectivesModule } from '../shared';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    CommonModule,
    SentimentRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    DirectivesModule,
    MatProgressSpinnerModule,
  ],
  declarations: [SentimentComponent]
})
export class SentimentModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SentimentComponent } from './sentiment.component';

const routes: Routes = [
  {
    path: '',
    component: SentimentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SentimentRoutingModule { }

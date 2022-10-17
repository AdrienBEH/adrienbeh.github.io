import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SymbolGuard } from './core/guards';

const routes: Routes = [
  {
    path: 'symbols',
    loadChildren: () => import('./symbols/symbols.module').then((m) => m.SymbolsModule),
  },
  {
    path: 'sentiment/:symbol',
    loadChildren: () => import('./sentiment/sentiment.module').then((m) => m.SentimentModule),
    canActivate: [
      SymbolGuard
    ],
  },
  {
    path: '**',
    redirectTo: 'symbols',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledNonBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

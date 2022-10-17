import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FinnhubTokenInterceptor } from './interceptors';
import { FinnhubService, StockService } from './services';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    FinnhubService,
    StockService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: FinnhubTokenInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}

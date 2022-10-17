import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { CoreModule } from './core';
import { SnackbarNotificationModule } from './shared/components/snackbar-notification/snackbar-notification.module';
import { SymbolGuard } from './core/guards';

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [SymbolGuard],
  imports: [
    CoreModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    SnackbarNotificationModule,
  ],
})
export class AppModule {}

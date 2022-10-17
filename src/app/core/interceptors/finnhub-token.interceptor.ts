import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class FinnhubTokenInterceptor implements HttpInterceptor {
  intercept(
    httpRequest: HttpRequest<unknown>,
    httpHandler: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (httpRequest.url.includes('finnhub.io')) {
      return httpHandler.handle(this.addAPIToken(httpRequest));
    }
    return httpHandler.handle(httpRequest);
  }

  private addAPIToken(httpRequest: HttpRequest<unknown>): HttpRequest<unknown> {
    const API_KEY = 'bu4f8kn48v6uehqi3cqg';
    return httpRequest.clone({ setParams: { token: API_KEY } });
  }
}

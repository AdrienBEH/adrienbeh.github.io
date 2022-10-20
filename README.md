Showcase for Angular Certification Lvl2
[angularcertif2.web.app](https://angularcertif2.web.app)

# Project Definitions
[Investopedia StockSymbol](https://www.investopedia.com/terms/s/stocksymbol.asp)

# Deployment
[Adrien Behadir Firebase Hosting](https://console.firebase.google.com/project/angularcertif2/hosting/sites)

# Dev showcase
- [Angular Lazy Module](src/app/app-routing.module.ts)
- [Angular Custom Pipe - ReversePipe](src/app/shared/pipes/reverse.pipe.ts)
- [Angular Custom - ClassValidatorDirective](src/app/shared/directives/class-validator.directive.ts)
- [Angular Custom - GridDirective](src/app/shared/directives/grid.directive.ts)
- [Angular Custom Component - SymbolComponent](src/app/shared/components/symbol/symbol.module.ts)
- [Angular Custom Component - SnackbarNotificationComponent](src/app/shared/components/snackbar-notification/snackbar-notification.module.ts)
- [Angular Guard](src/app/core/guards/symbol.guard.ts)
- [Angular Interceptor](src/app/core/interceptors/finnhub-token.interceptor.ts)
- [JS Sort Function](src/app/shared/utils/sort-by-custom-key.util.ts)
- [JS LocalStorage](src/app/core/services/stock.service.ts)
- [RxJs - StockService](src/app/core/services/stock.service.ts)
- [RxJs - FinnhubService](src/app/core/services/finnhub.service.ts)
- [RxJs - SymbolsComponent](src/app/symbols/symbols.component.ts)
- [RxJs - SentimentComponent](src/app/sentiment/sentiment.component.ts)
- [RxJs - avoid API DDOS - SymbolsComponent.ngOnInit()](src/app/symbols/symbols.component.ts)
```ts
// ...omitted
ngOnInit() {
  this.filteredSymbols$ = this.symbolControl.valueChanges.pipe(
    // ...omitted
    switchMap((value: string | StockSymbol | null) => {
      // ...omitted
      return timer(700).pipe(
        last(),
        switchMap(() => this.finnhubService.getSymbols(value as string)),
      )
    }),
    // ...omitted
  );
  // ...omitted
}
```
- [RxJs - merge observables - StockService.add()](src/app/core/services/stock.service.ts)
``` ts
public add(symbol: StockSymbol): Observable<StockSymbol | undefined> {
  // ...omitted
  return of(symbol).pipe(
    mergeMap((symbol: StockSymbol) => {
      // ...omitted
      return this.finnhubService.getQuote(symbol.symbol).pipe(
        // ...omitted
      )
    }),
  );
}
```
- Angular - Pipe TS code use case - SymbolsComponent.trackStockSymbol()](src/app/symbols/symbols.component.ts)
```ts
trackStockSymbol(): void {
  // ...omitted
    this.asyncPipe.transform(
      this.stockService.add(this.symbolControl.value)
      // ...omitted
    );
  }
}
```

# TODO
## Angular token
L'addresse de l'API Finnhub doit être stockée dans un token puis injectée.

Documentions pour aider à la réalisation :
[Angular InjectionToken documentation](https://angular.io/api/core/InjectionToken)
[Tektutorialshub InjectionToken](https://www.tektutorialshub.com/angular/injection-token-in-angular/)

## Angular animation
Au minimum, la liste des symbols vue /symbols doit être animée ainsi :
- ajout d'un symbol, les symbols déjà existant doivent se déplacer de la gauche vers la droite
- ajout d'un symbol, un effet de fade doit être mis sur le symbol ajouté
- ajout d'un symbol, le spinner doit apparaitre d'un opacity de 0 vers 1, puis disparaître d'un opacity de 1 vers 0
- suppression d'un symbol, les symbols déjà existant doivent se déplacer de la droite vers la gauche
- suppression d'un symbol, un effet de fade doit être mis sur le symbol ajouté

Documentions pour aider à la réalisation :
[Angular animations documentation](https://angular.io/guide/animations)
[Medium motion animations](https://medium.com/google-developer-experts/angular-applying-motion-principles-to-a-list-d5cdd35c899e)

## CD
Ajouter linter et automatiser au [commit](https://www.npmjs.com/package/pre-commit).

## CI
Nettoyer les restes inutiles de CI du au passage de Github Pages à Firebase Hosting.

Documentions pour aider à la réalisation :
[Angular InjectionToken documentation](https://www.c-sharpcorner.com/article/how-to-deploy-and-host-an-angular-application-on-firebase/)
[Tektutorialshub InjectionToken](https://medium.com/@saleemmalikraja/deploying-an-angular-app-to-firebase-hosting-18f99c9d5722)

## Documentation
Documenter au moins pour décrire les inputs/output et contexte des éléments.

## Tests
Unitaires, fonctionnels et e2e

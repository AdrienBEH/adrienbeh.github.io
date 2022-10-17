import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { SnackbarNotificationService } from "src/app/shared/components/snackbar-notification/snackbar-notification.service";
import { StockService } from "../services";

@Injectable()
export class SymbolGuard implements CanActivate {
    constructor(
        private stockService: StockService,
        private router: Router,
        private snackbarNotificationService: SnackbarNotificationService,
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if (this.stockService.has(route.params.symbol)) {
            return true;
        }
        this.snackbarNotificationService.openSnackBar({
          icon: 'info',
          message: `The symbol ${route.params.symbol} is not stored. Pleaze store the symbol before requesting access to their details.`,
          type: 'INFO',
          duration: 3000,
        });
        return this.router.parseUrl('symbols');
    }
}

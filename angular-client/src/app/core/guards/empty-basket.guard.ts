import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {BasketService} from "../services/basket.service";
import {SnackbarService} from "../services/snackbar.service";

export const emptyBasketGuard: CanActivateFn = (route, state) => {
  const basketService = inject(BasketService);
  const snackbar = inject(SnackbarService);
  const router = inject(Router);

  if (basketService.itemCount() === 0) {
    snackbar.error("You basket is empty!");
    router.navigateByUrl("/basket");
    return false;
  }

  return true;
};

import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AccountService} from "../services/account.service";
import {map, of} from "rxjs";

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const router = inject(Router);
  //
  // as you know signals are synchronous so it was not redirecting to return url page
  // in order to use we have to make use of observables
  //
  if (accountService.currentUser()) {
    //return true;
    return of(true);
  } else {

    // router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    // return false;
    return accountService.getAuthState().pipe(map(auth => {
      if (auth.isAuthenticated) return true;
      else {
        router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
        return false;
      }
    }));
  }
};

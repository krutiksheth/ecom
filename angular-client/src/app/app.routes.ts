import {Routes} from '@angular/router';
import {HomeComponent} from "./features/home/home.component";
import {ShopComponent} from "./features/shop/shop.component";
import {ProductDetailsComponent} from "./features/shop/product-details/product-details.component";
import {TestErrorComponent} from "./features/test-error/test-error.component";
import {ServerErrorComponent} from "./shared/components/server-error/server-error.component";
import {NotFoundComponent} from "./shared/components/not-found/not-found.component";
import {BasketComponent} from "./features/basket/basket.component";
import {CheckoutComponent} from "./features/checkout/checkout.component";
import {LoginComponent} from "./features/account/login/login.component";
import {RegisterComponent} from "./features/account/register/register.component";
import {authGuard} from "./core/guards/auth.guard";
import {emptyBasketGuard} from "./core/guards/empty-basket.guard";
import {CheckoutSuccessComponent} from "./features/checkout/checkout-success/checkout-success.component";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'shop', component: ShopComponent},
  {path: 'shop/:id', component: ProductDetailsComponent},
  {path: 'basket', component: BasketComponent},
  {path: 'checkout', component: CheckoutComponent, canActivate: [authGuard, emptyBasketGuard]},
  {path: 'checkout/success', component: CheckoutSuccessComponent, canActivate: [authGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'test-error', component: TestErrorComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'server-error', component: ServerErrorComponent},
  {path: '**', redirectTo: 'not-found', pathMatch: 'full'},
];

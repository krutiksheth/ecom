import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {OrderSummaryComponent} from "../../shared/components/order-summary/order-summary.component";
import {MatStepperModule} from "@angular/material/stepper";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {StripeService} from "../../core/services/stripe.service";
import {StripeAddressElement, StripePaymentElement} from "@stripe/stripe-js";
import {SnackbarService} from "../../core/services/snackbar.service";
import {MatCheckboxChange, MatCheckboxModule} from "@angular/material/checkbox";
import {StepperSelectionEvent} from "@angular/cdk/stepper";
import {AccountService} from "../../core/services/account.service";
import {firstValueFrom} from "rxjs";
import {Address} from "../../shared/models/user";
import {CheckoutDeliveryComponent} from "./checkout-delivery/checkout-delivery.component";

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    OrderSummaryComponent,
    MatStepperModule,
    MatButton,
    RouterLink,
    MatCheckboxModule,
    CheckoutDeliveryComponent,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit, OnDestroy {

  stripeService = inject(StripeService);
  addressElement?: StripeAddressElement;
  paymentElement?: StripePaymentElement;
  snackBar = inject(SnackbarService);
  saveAddress: boolean = false;
  private accountService = inject(AccountService);

  async ngOnInit() {
    try {
      this.addressElement = await this.stripeService.createAddressElement();
      this.addressElement.mount("#address-element");

      this.paymentElement = await this.stripeService.createPaymentElement();
      this.paymentElement.mount("#payment-element");
    } catch (error: any) {
      this.snackBar.error(error.message);
    }
  }

  async onStepChange(event: StepperSelectionEvent) {
    debugger;
    if (event.selectedIndex === 1) {
      if (this.saveAddress) {
        const address = await this.getAddressFromStripe();
        if (address) {
          await firstValueFrom(this.accountService.updateAddress(address));
        }
      }
    }
  }

  async getAddressFromStripe(): Promise<Address | undefined> {
    const result = await this.addressElement?.getValue();
    return {
      name: result?.value.name ?? "",
      line1: result?.value.address.line1 ?? "",
      line2: result?.value.address.line2,
      city: result?.value.address.city ?? "",
      state: result?.value.address.state ?? "",
      country: result?.value.address.country ?? "",
      postal_code: result?.value.address.postal_code ?? "",
    };
  }

  onSaveCheckboxChange(event: MatCheckboxChange) {
    this.saveAddress = event.checked;
  }

  ngOnDestroy() {
    this.stripeService.disposeElements();
  }

}

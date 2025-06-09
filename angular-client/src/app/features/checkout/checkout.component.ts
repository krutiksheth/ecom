import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {OrderSummaryComponent} from "../../shared/components/order-summary/order-summary.component";
import {MatStepperModule} from "@angular/material/stepper";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {StripeService} from "../../core/services/stripe.service";
import {
  ConfirmationToken,
  StripeAddressElement,
  StripeAddressElementChangeEvent,
  StripePaymentElement,
  StripePaymentElementChangeEvent
} from "@stripe/stripe-js";
import {SnackbarService} from "../../core/services/snackbar.service";
import {MatCheckboxChange, MatCheckboxModule} from "@angular/material/checkbox";
import {StepperSelectionEvent} from "@angular/cdk/stepper";
import {AccountService} from "../../core/services/account.service";
import {firstValueFrom} from "rxjs";
import {Address} from "../../shared/models/user";
import {CheckoutReviewComponent} from "./checkout-review/checkout-review.component";
import {BasketService} from "../../core/services/basket.service";
import {CurrencyPipe, JsonPipe} from "@angular/common";

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    OrderSummaryComponent,
    MatStepperModule,
    MatButton,
    RouterLink,
    MatCheckboxModule,
    CheckoutReviewComponent,
    CurrencyPipe,
    JsonPipe
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
  basketService = inject(BasketService);
  completionStatus = signal<{ address: boolean, card: boolean }>({
    address: false,
    card: false
  });
  confirmationToken?: ConfirmationToken;

  private accountService = inject(AccountService);

  async getConfirmationToken() {
    try {
      if (Object.values(this.completionStatus()).every(status => status === true)) {
        const result = await this.stripeService.createConfirmationToken();
        if (result.error) throw new Error(result.error.message);

        this.confirmationToken = result.confirmationToken;
        console.log(this.confirmationToken);
      }
    } catch (error: any) {
      this.snackBar.error(error.message);
    }
  }

  async ngOnInit() {
    try {
      this.addressElement = await this.stripeService.createAddressElement();
      this.addressElement.mount("#address-element");
      this.addressElement.on("change", this.handleAddressChange);

      this.paymentElement = await this.stripeService.createPaymentElement();
      this.paymentElement.mount("#payment-element");
      this.paymentElement.on("change", this.handlePaymentChange);

    } catch (error: any) {
      this.snackBar.error(error.message);
    }
  }

  handlePaymentChange = (event: StripePaymentElementChangeEvent) => {
    this.completionStatus.update(state => ({
      ...state,
      card: event.complete
    }));
  }
  // use arrow function to avoid binding issues
  handleAddressChange = (event: StripeAddressElementChangeEvent) => {
    this.completionStatus.update(state => ({
      ...state,
      address: event.complete
    }));
  }


  async onStepChange(event: StepperSelectionEvent) {
    if (event.selectedIndex === 1) {
      if (this.saveAddress) {
        const address = await this.getAddressFromStripe();
        if (address) {
          await firstValueFrom(this.accountService.updateAddress(address));
        }
      }
    }
    if (event.selectedIndex === 2) {
      await this.getConfirmationToken();
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

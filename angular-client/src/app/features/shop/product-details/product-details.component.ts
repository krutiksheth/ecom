import {Component, inject, OnInit} from '@angular/core';
import {ShopsService} from "../../../core/services/shops.service";
import {ActivatedRoute} from "@angular/router";
import {Product} from "../../../shared/models/product";
import {CurrencyPipe} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatDivider} from "@angular/material/divider";
import {BasketService} from "../../../core/services/basket.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CurrencyPipe,
    MatButton,
    MatIcon,
    MatFormField,
    MatInput,
    MatLabel,
    MatDivider,
    FormsModule
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {

  private shopService = inject(ShopsService);
  private activatedRoute = inject(ActivatedRoute);
  private basketService =inject(BasketService);
  product?:Product;
  quantityInCart=0;
  quantity=1;

  ngOnInit(): void {
    this.loadProduct()
  }

  loadProduct(){
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if(!id) return;

    this.shopService.getProductById(+id).subscribe({
      next: product => {
        this.product = product
        this.updateQuantityInCart();
      },
      error: error => console.log(error)
    })
  }

  updateBasket(){
    if(!this.product) return;

    if(this.quantity> this.quantityInCart){
      const itemsToAdd = this.quantity - this.quantityInCart;
      this.quantityInCart += itemsToAdd;
      this.basketService.addBasketItem(this.product, itemsToAdd);
    }else{
      const itemsToRemove = this.quantityInCart - this.quantity;
      this.quantityInCart -= itemsToRemove;
      this.basketService.addBasketItem(this.product, itemsToRemove);
    }
  }

  updateQuantityInCart(){
    this.quantityInCart= this.basketService.basket()?.items.find(item=> item.productId ===this.product?.id)?.quantity || 0;
    this.quantity=this.quantityInCart || 1;
  }
}

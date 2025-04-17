import {Component, inject, OnInit} from '@angular/core';
import {ShopsService} from "../../core/services/shops.service";
import {MatCard} from "@angular/material/card";
import {Product} from "../../shared/models/product";
import {ProductItemComponent} from "./product-item/product-item.component";

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    MatCard,
    ProductItemComponent
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {

  products: Product[] =[];
  private shopService = inject(ShopsService);

  ngOnInit(): void {
    this.shopService.getProduct().subscribe({
      next: data => this.products = data,
      error: error => console.log(error),
      complete:()=> console.log('complete')
    })
  }
}

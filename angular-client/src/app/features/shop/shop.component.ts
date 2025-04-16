import {Component, inject, OnInit} from '@angular/core';
import {ShopsService} from "../../core/services/shops.service";
import {MatCard} from "@angular/material/card";

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    MatCard
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {

  products: any[] =[];
  private shopService = inject(ShopsService);

  ngOnInit(): void {
    this.shopService.getProduct().subscribe({
      next: data => this.products = data,
      error: error => console.log(error),
      complete:()=> console.log('complete')
    })
  }
}

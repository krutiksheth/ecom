import {Component, inject, OnInit} from '@angular/core';
import {ShopsService} from "../../core/services/shops.service";
import {MatCard} from "@angular/material/card";
import {Product} from "../../shared/models/product";
import {ProductItemComponent} from "./product-item/product-item.component";
import {MatDialog} from "@angular/material/dialog";
import {FilterDialogComponent} from "./filter-dialog/filter-dialog.component";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    MatCard,
    ProductItemComponent,
    MatButton,
    MatIcon,
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {

  private shopService = inject(ShopsService);
  private dialogService = inject(MatDialog);
  products: Product[] =[];
  types: string[] =[];
  brands: string[] = [];

  ngOnInit(): void {
    this.initializeShop();
  }

  initializeShop(): void {
    this.shopService.getFilters();
    this.shopService.getProduct().subscribe({
      next: data => this.products = data,
      error: error => console.log(error),
      complete:()=> console.log('complete')
    });
  }

  openFilterDialog(){
   const dialogReg= this.dialogService.open(FilterDialogComponent, {
     minWidth:"500px"
   })
  }
}

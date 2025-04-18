import {Component, inject, OnInit} from '@angular/core';
import {ShopsService} from "../../core/services/shops.service";
import {MatCard} from "@angular/material/card";
import {Product} from "../../shared/models/product";
import {ProductItemComponent} from "./product-item/product-item.component";
import {MatDialog} from "@angular/material/dialog";
import {FilterDialogComponent} from "./filter-dialog/filter-dialog.component";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatListOption, MatSelectionList, MatSelectionListChange} from "@angular/material/list";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";
import {MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    MatCard,
    ProductItemComponent,
    MatButton,
    MatIcon,
    MatMenu,
    MatSelectionList,
    MatListOption,
    MatMenuTrigger
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {

  private shopService = inject(ShopsService);
  private dialogService = inject(MatDialog);
  products: Product[] = [];
  types: string[] = [];
  brands: string[] = [];
  selectedBrands: string[] = [];
  selectedTypes: string[] = [];
  selectedSort: string = "name";
  sortOptions = [
    {name: "Alphabetical", value: "name"},
    {name: "Price: Low-High", value: "price"},
    {name: "Price: High-Low", value: "priceDesc"},
  ]

  ngOnInit(): void {
    this.initializeShop();
  }

  initializeShop(): void {
    this.shopService.getFilters();
    this.getProduct();
  }

  getProduct() {
    this.shopService.getProduct(this.selectedBrands, this.selectedTypes, this.selectedSort).subscribe({
      next: data => {
        this.products = data;
      },
      error: error => console.log(error),
      complete: () => console.log('complete')
    });
  }

  onSortChange(event: MatSelectionListChange) {
    const selectedOption = event.options[0];

    if (selectedOption) {
      this.selectedSort = selectedOption.value;
      this.getProduct();
    }
  }

  openFilterDialog() {
    const dialogRef = this.dialogService.open(FilterDialogComponent, {
      minWidth: "500px",
      data: {
        selectedBrands: this.selectedBrands,
        selectedTypes: this.selectedTypes,
      }
    });

    dialogRef.afterClosed().subscribe({
      next: result => {
        if (result) {

          this.selectedBrands = result.selectedBrands;
          this.selectedTypes = result.selectedTypes;

          // apply filter
          this.getProduct();
        }
      }
    });
  }


}

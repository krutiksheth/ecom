import {Component, inject, OnInit} from '@angular/core';
import {ShopsService} from "../../core/services/shops.service";
import {Product} from "../../shared/models/product";
import {ProductItemComponent} from "./product-item/product-item.component";
import {MatDialog} from "@angular/material/dialog";
import {FilterDialogComponent} from "./filter-dialog/filter-dialog.component";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatListOption, MatSelectionList, MatSelectionListChange} from "@angular/material/list";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {ShopParams} from "../../shared/models/shopParams";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    ProductItemComponent,
    MatButton,
    MatIcon,
    MatMenu,
    MatSelectionList,
    MatListOption,
    MatMenuTrigger,
    MatPaginator,
    MatPaginator,
    FormsModule,
    MatIconButton
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {

  private shopService = inject(ShopsService);
  private dialogService = inject(MatDialog);
  products: Product[] = [];
  sortOptions = [
    {name: "Alphabetical", value: "name"},
    {name: "Price: Low-High", value: "price"},
    {name: "Price: High-Low", value: "priceDesc"},
  ]
  pageSizeOptions = [8,12,16];
  shopParams = new ShopParams();
  count: number = 0;

  ngOnInit(): void {
    this.initializeShop();
  }

  initializeShop(): void {
    this.shopService.getFilters();
    this.getProduct();
  }

  getProduct() {
    this.shopService.getProduct(this.shopParams).subscribe({
      next: (response) => {
        this.products = response.body? response.body:[];

        const headers= response.headers;
        const paginationHeader = headers.get('Pagination');

        if(paginationHeader) {
                const pagination = JSON.parse(paginationHeader);

                this.count =pagination.totalCount;
                this.shopParams.pageSize = pagination.pageSize;
                this.shopParams.pageNumber=pagination.currentPage;
        }
      },
      error: error => console.log(error),
      complete: () => console.log('complete')
    });
  }

  onSearchChange(){
    this.shopParams.pageNumber = 1;
    this.getProduct();
  }

  handlePageEvent(event:PageEvent) {
    this.shopParams.pageNumber = event.pageIndex+1;
    this.shopParams.pageSize = event.pageSize;
    this.getProduct();
  }

  onSortChange(event: MatSelectionListChange) {
    const selectedOption = event.options[0];

    if (selectedOption) {
      this.shopParams.sort = selectedOption.value;
      this.shopParams.pageNumber=1;
      this.getProduct();
    }
  }

  openFilterDialog() {
    const dialogRef = this.dialogService.open(FilterDialogComponent, {
      minWidth: "500px",
      data: {
        selectedBrands: this.shopParams.brands,
        selectedTypes: this.shopParams.types,
      }
    });

    dialogRef.afterClosed().subscribe({
      next: result => {
        if (result) {

          this.shopParams.brands = result.selectedBrands;
          this.shopParams.types = result.selectedTypes;
          this.shopParams.pageNumber=1;
          // apply filter
          this.getProduct();
        }
      }
    });
  }


}

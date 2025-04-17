import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {filters} from "../../shared/models/filters";
import {Product} from "../../shared/models/product";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShopsService {

  baseUrl = 'https://localhost:5001/api';
  private http = inject(HttpClient);
  brands: string[] = [];
  types: string[] = [];

  getProduct(){
    return this.http.get<Product[]>(this.baseUrl+'/products');
  }

  getFilters(){

    if(this.brands.length > 0 && this.types.length > 0) return;

    this.http.get<filters>(this.baseUrl+'/products/filters').subscribe({
      next: data => (
        {
          brands: this.brands= data.brands,
          types: this.types = data.types,
        }),
    });
  }
}

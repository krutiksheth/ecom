import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
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

  getProduct(brands?: string[], types?: string[], sort?: string) {
    let params = new HttpParams();

    if(brands && brands.length > 0) {
     params= params.append('brands', brands.join(','));
    }

    if(types && types.length > 0) {
      params= params.append('types', types.join(','));
    }

    if(sort){
      params= params.append('OrderBy', sort);
    }

    params = params.append("pageSize", 20);

    return this.http.get<Product[]>(this.baseUrl+'/products', {params: params});
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

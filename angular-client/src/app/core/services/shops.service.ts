import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {filters} from "../../shared/models/filters";
import {Product} from "../../shared/models/product";
import {of} from "rxjs";
import {ShopParams} from "../../shared/models/shopParams";


@Injectable({
  providedIn: 'root'
})
export class ShopsService {

  baseUrl = 'https://localhost:5001/api';
  private http = inject(HttpClient);
  brands: string[] = [];
  types: string[] = [];

  getProduct(shopParams: ShopParams) {
    let params = new HttpParams();

    if(shopParams.brands && shopParams.brands.length > 0) {
     params= params.append('brands', shopParams.brands.join(','));
    }

    if(shopParams.types && shopParams.types.length > 0) {
      params= params.append('types', shopParams.types.join(','));
    }

    if(shopParams.sort){
      params= params.append('OrderBy', shopParams.sort);
    }

    if(shopParams.searchTerm){
      params= params.append('searchTerm', shopParams.searchTerm);
    }

    params = params.append("pageSize", shopParams.pageSize);
    params = params.append("pageNumber", shopParams.pageNumber);

    return this.http.get<Product[]>(this.baseUrl+'/products', {params: params, observe: 'response'});
  }

  getProductById(id:number){
    return this.http.get<Product>(this.baseUrl+'/products/'+id);
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

import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ShopsService {

  baseUrl = 'https://localhost:5001/api';
  private http = inject(HttpClient);

  getProduct(){
    return this.http.get<any[]>(this.baseUrl+'/products');
  }
}

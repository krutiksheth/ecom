import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from "./layout/header/header.component";
import {HttpClient} from "@angular/common/http";
import {ShopsService} from "./core/services/shops.service";
import {ShopComponent} from "./features/shop/shop.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, ShopComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'Ecom';
  //old approach
  //constructor(private http: HttpClient) { }
  //new approach
  //private http = inject(HttpClient);

}

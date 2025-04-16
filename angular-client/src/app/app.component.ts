import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from "./layout/header/header.component";
import {HttpClient} from "@angular/common/http";
import {ShopsService} from "./core/services/shops.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  title = 'Ecom';
  //old approach
  //constructor(private http: HttpClient) { }
  //new approach
  //private http = inject(HttpClient);
  products: any[] =[];
  private shopeService = inject(ShopsService);

  ngOnInit(): void {
   this.shopeService.getProduct().subscribe({
      next: data => this.products = data,
      error: error => console.log(error),
      complete:()=> console.log('complete')
    })
  }
}

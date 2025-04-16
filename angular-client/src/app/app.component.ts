import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from "./layout/header/header.component";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  baseUrl = 'https://localhost:5001/api';
  title = 'Ecom';
  //old approach
  //constructor(private http: HttpClient) { }
  //new approach
  private http = inject(HttpClient);
  products: any[] =[];

  ngOnInit(): void {
    this.http.get<any[]>(this.baseUrl+'/products').subscribe({
      next: data => this.products = data,
      error: error => console.log(error),
      complete:()=> console.log('complete')
    })
  }
}

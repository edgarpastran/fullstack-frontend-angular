import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../_model/product';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  dataChange = new Subject<Product[]>();
  messageInfoChange = new Subject<string>();
  url: string = `${environment.HOST}/products`; 

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Product[]>(this.url);
  }

  listPageable(page: number, size: number)  {
    return this.http.get<any>(`${this.url}/pageable?page=${page}&size=${size}`);
  }
  
  find(id: number) {
    return this.http.get<Product>(`${this.url}/${id}`);
  }

  register(product: Product) {
    return this.http.post(this.url, product);
  }

  update(product: Product) {
    return this.http.put(this.url, product);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}

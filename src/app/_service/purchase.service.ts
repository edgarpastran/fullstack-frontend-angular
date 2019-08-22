import { PurchaseSummaryDTO } from './../_dto/purchaseSummaryDTO';
import { FilterPurchaseDTO } from '../_dto/filterPurchaseDTO';
import { Purchase } from './../_model/purchase';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  url: string = `${environment.HOST}/purchases`; 

  constructor(private http: HttpClient) { }

  register(purchase: Purchase) {
    return this.http.post(this.url, purchase);
  }

  search(filterPurchaseDTO: FilterPurchaseDTO) {
    return this.http.post<Purchase[]>(`${this.url}/search`, filterPurchaseDTO);
  }

  listSummary() {
    return this.http.get<PurchaseSummaryDTO[]>(`${this.url}/listPurchaseSummary`);
  }

  generatePurchaseSummaryReport() {
    return this.http.get(`${this.url}/reportPurchaseSummary`, {
      responseType: 'blob'
    });
  }
}

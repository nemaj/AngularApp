import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor(private _http: HttpClient) {}

  saveOrder(data): Observable<any> {
    return this._http.post(`${baseUrl}/orders/saveOrder.php`, {
      products: data
    });
  }

  getOrders(id): Observable<any> {
    return this._http.get(`${baseUrl}/orders/getOrders.php?id=${id}`);
  }

  orderReceived(code): Observable<any> {
    return this._http.get(`${baseUrl}/orders/orderReceived.php?code=${code}`);
  }

  getOrdersForSupplier(id): Observable<any> {
    return this._http.get(
      `${baseUrl}/orders/getOrdersForSupplier.php?id=${id}`
    );
  }
}

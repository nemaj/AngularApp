import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private _http: HttpClient) {}

  saveProductToCart(data): Observable<any> {
    return this._http.post(`${baseUrl}/cart/addProduct.php`, data);
  }

  getCartProduct(id): Observable<any> {
    return this._http.get(`${baseUrl}/products/getCartProducts.php?id=${id}`);
  }

  manageQuantity(data): Observable<any> {
    return this._http.post(`${baseUrl}/cart/manageQuantity.php`, data);
  }

  removeProduct(id): Observable<any> {
    return this._http.get(`${baseUrl}/cart/removeProduct.php?id=${id}`);
  }
}

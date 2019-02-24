import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  constructor(private _http: HttpClient) {}

  getListCollectionBy(id): Observable<any> {
    return this._http.get(
      `${baseUrl}/reports/listOfCollectionBySuppliers.php?id=${id}`
    );
  }

  getListProductBy(id): Observable<any> {
    return this._http.get(
      `${baseUrl}/reports/listOfProductBySupplier.php?id=${id}`
    );
  }

  getListOrderBy(id): Observable<any> {
    return this._http.get(
      `${baseUrl}/reports/listOrdersBySupplier.php?id=${id}`
    );
  }

  getListFeedbackBy(id): Observable<any> {
    return this._http.get(
      `${baseUrl}/reports/listOfFeedbackBySupplier.php?id=${id}`
    );
  }

  getListCollection(): Observable<any> {
    return this._http.get(`${baseUrl}/reports/listOfCollection.php`);
  }

  getListSupplier(): Observable<any> {
    return this._http.get(`${baseUrl}/reports/listOfSupplier.php`);
  }

  getListCustomer(): Observable<any> {
    return this._http.get(`${baseUrl}/reports/listOfCustomer.php`);
  }

  getListProducts(): Observable<any> {
    return this._http.get(`${baseUrl}/reports/listOfProducts.php`);
  }

  getListOrders(): Observable<any> {
    return this._http.get(`${baseUrl}/reports/listOfOrders.php`);
  }

  getListFeedback(): Observable<any> {
    return this._http.get(`${baseUrl}/reports/listOfFeedback.php`);
  }

  getCustomerChart(): Observable<any> {
    return this._http.get(`${baseUrl}/reports/chartCustomer.php`);
  }

  getSupplierChart(): Observable<any> {
    return this._http.get(`${baseUrl}/reports/chartSupplier.php`);
  }

  getCollectionChart(): Observable<any> {
    return this._http.get(`${baseUrl}/reports/chartCollection.php`);
  }
}

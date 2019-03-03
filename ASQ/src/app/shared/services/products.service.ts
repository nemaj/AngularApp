import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private _http: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this._http.get(`${baseUrl}/products/getAllProducts.php`);
  }

  searchProduct(text): Observable<any> {
    return this._http.get(
      `${baseUrl}/products/searchProduct.php?search=${text}`
    );
  }

  getImages(id): Observable<any> {
    return this._http.get(`${baseUrl}/products/getImages.php?id=${id}`);
  }

  searchProductByType(id): Observable<any> {
    return this._http.get(
      `${baseUrl}/products/searchProductByType.php?id=${id}`
    );
  }

  getProductForHome(): Observable<any> {
    return this._http.get(`${baseUrl}/products/getBestProducts.php`);
  }

  getSuggestionProduct(type, budget): Observable<any> {
    return this._http.get(
      `${baseUrl}/products/getSuggestionProduct.php?type=${type}&budget=${budget}`
    );
  }

  getProductsListEachSupplier(id): Observable<any> {
    return this._http.get(
      `${baseUrl}/products/getProductsBySupplier.php?id=${id}`
    );
  }

  getProductImages(id): Observable<any> {
    return this._http.get(`${baseUrl}/products/getProductImages.php?id=${id}`);
  }

  uploadImage(data): Observable<any> {
    return this._http.post(`${baseUrl}/products/addProductImage.php`, data);
  }

  removeImage(id): Observable<any> {
    return this._http.get(
      `${baseUrl}/products/removeProductImage.php?id=${id}`
    );
  }

  getEactProduct(id): Observable<any> {
    return this._http.get(`${baseUrl}/products/getEachProduct.php?id=${id}`);
  }

  saveProduct(data, id = 0): Observable<any> {
    const url = id
      ? `products/createProduct.php?id=${id}`
      : 'products/createProduct.php';
    return this._http.post(`${baseUrl}/${url}`, data);
  }

  getTypes(): Observable<any> {
    return this._http.get(`${baseUrl}/products/getTypes.php`);
  }

  getUnits(): Observable<any> {
    return this._http.get(`${baseUrl}/products/getUnits.php`);
  }

  getEachType(id): Observable<any> {
    return this._http.get(`${baseUrl}/products/getEachType.php?id=${id}`);
  }

  getEachUnit(id): Observable<any> {
    return this._http.get(`${baseUrl}/products/getEachUnit.php?id=${id}`);
  }

  createType(type): Observable<any> {
    return this._http.post(`${baseUrl}/products/addTypes.php`, { type });
  }

  createUnit(unit): Observable<any> {
    return this._http.post(`${baseUrl}/products/addUnits.php`, { unit });
  }

  updateTypes(data): Observable<any> {
    return this._http.post(`${baseUrl}/products/updateTypes.php`, data);
  }

  updateUnits(data): Observable<any> {
    return this._http.post(`${baseUrl}/products/updateUnits.php`, data);
  }

  removeType(id): Observable<any> {
    return this._http.get(`${baseUrl}/products/removeTypes.php?id=${id}`);
  }

  removeProduct(id): Observable<any> {
    return this._http.get(`${baseUrl}/products/removeProduct.php?id=${id}`);
  }

  removeUnits(id): Observable<any> {
    return this._http.get(`${baseUrl}/products/removeUnits.php?id=${id}`);
  }

  browseProducts(data): Observable<any> {
    return this._http.post(`${baseUrl}/products/browseProducts.php`, data);
  }
}

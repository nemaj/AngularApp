import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
const baseUrl = `${environment.baseUrl}/materials`;

@Injectable({
  providedIn: 'root'
})
export class MaterialsService {
  constructor(private _http: HttpClient) {}

  getMaterials(): Observable<any> {
    return this._http.get(`${baseUrl}/getFileList.php`);
  }

  addMaterial(data): Observable<any> {
    return this._http.post(`${baseUrl}/addFile.php`, data);
  }

  removeFile(id): Observable<any> {
    return this._http.get(`${baseUrl}/removeFile.php?id=${id}`);
  }
}

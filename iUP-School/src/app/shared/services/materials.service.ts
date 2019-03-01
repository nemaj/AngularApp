import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { map } from 'rxjs/operators';
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

  upload(fileToUpload: File, name): Observable<any> {
    const endpoint = `${baseUrl}/uploadFile.php`;
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    formData.append('name', name);
    return this._http.post(endpoint, formData).pipe(
      map(() => {
        return true;
      })
    );
  }
}

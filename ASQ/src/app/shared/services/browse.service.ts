import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrowseService {
  private searchData;

  constructor() {}

  setData(data) {
    this.searchData = data;
    localStorage.setItem('browseData', JSON.stringify(data));
  }

  getData() {
    if (!this.searchData) {
      this.searchData = JSON.parse(localStorage.getItem('browseData'));
    }
    return this.searchData;
  }
}

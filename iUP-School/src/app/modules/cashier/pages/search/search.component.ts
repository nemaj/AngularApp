import { Component, OnInit } from '@angular/core';
import { CashierService } from '@shared/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  search: string;
  isDoneSearch: boolean = false;
  searchTimeout;

  searchResult: Array<any> = [];
  constructor(private router: Router, private _cashier: CashierService) {}

  ngOnInit() {}

  select(item) {
    console.log('item', item);
    this.router.navigate([`/cashier/account/${item.id}`]);
  }

  find(value) {
    this.isDoneSearch = false;
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    this.searchTimeout = setTimeout(() => {
      this.isDoneSearch = true;
      this._cashier.findPupil(value).subscribe(res => {
        this.searchResult = res;
      });
    }, 1000);
  }
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'up-search',
  templateUrl: './up-search.component.html',
  styleUrls: ['./up-search.component.scss']
})
export class UpSearchComponent implements OnInit {
  @Input()
  label;

  @Input()
  placeholder;

  dataList: Array<any> = [];
  resultList: Array<any> = [];
  @Input()
  set data(v) {
    this.dataList = v;
    this.resultList = v;
  }

  @Output() getValue = new EventEmitter();

  isDoneSearch: boolean = false;
  isDoneSelect: boolean = false;
  searchTimeout;

  upSearch;
  tempValue;

  constructor() {}

  ngOnInit() {}

  onClick() {
    if (this.isDoneSelect) {
      this.upSearch = '';
      this.isDoneSelect = false;
    }
  }

  onBlur() {
    if (this.tempValue && this.tempValue.firstName) {
      this.isDoneSelect = true;
      this.isDoneSearch = false;
      this.upSearch = `${this.tempValue.firstName} ${this.tempValue.lastName}`;
    }
  }

  selectItem(item) {
    this.isDoneSearch = false;
    this.isDoneSelect = true;
    this.upSearch = `${item.firstName} ${item.lastName}`;
    this.tempValue = item;
    this.getValue.emit(item);
  }

  find(value: string) {
    this.isDoneSearch = false;
    this.isDoneSelect = false;
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    this.searchTimeout = setTimeout(() => {
      this.isDoneSearch = true;
      const list = [];
      this.dataList.forEach(item => {
        const { firstName, lastName, id } = item;
        if (
          !!(
            firstName && firstName.toLowerCase().match(new RegExp(value, 'g'))
          ) ||
          !!(firstName && lastName.toLowerCase().match(new RegExp(value, 'g')))
        ) {
          const obj = this.dataList.find(i => i.id === id);
          list.push(obj);
        }
      });
      this.resultList = list;
    }, 1000);
  }
}

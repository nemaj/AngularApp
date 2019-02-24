import { Component, OnInit, ViewChild } from '@angular/core';

import {
  OptionsService,
  CurrentUserService,
  UsersService
} from '@shared/services';
import { TypeaheadMatch } from 'ngx-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';

export interface Address {
  province: Object;
}

@Component({
  selector: 'app-customer-add-info',
  templateUrl: './customer-add-info.component.html',
  styleUrls: ['./customer-add-info.component.scss']
})
export class CustomerAddInfoComponent implements OnInit {
  @ViewChild('customerForm') customerForm: HTMLFormElement;

  // options
  countryList: any[] = [
    {
      en: 'Philippines',
      local: 'Philippines (les)',
      code: 'PH'
    }
  ];
  provinceList;
  cityList;
  cities;
  brgyList;
  brgys;

  street;
  province;
  provinceCode;
  city;
  cityCode;
  brgy;
  brgyCode;
  contactNo;
  customSelected: string;

  isUpdating: boolean = false;
  customerId: number = 0;

  returnUrl: string = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _options: OptionsService,
    private _currentUser: CurrentUserService,
    private _users: UsersService
  ) {}

  ngOnInit() {
    this.getBrgy();
    this.getCity();
    this.getProvince();
    this.getInfo();
  }

  getInfo() {
    this.returnUrl =
      this.activatedRoute.snapshot.queryParams['returnUrl'] || '/cart';
    const { info } = this._currentUser.getUserInfo();
    this._users.getCompleteInfo(info.usersId).subscribe(res => {
      if (res && res.customer_id) {
        this.isUpdating = true;
        this.customerId = res.customer_id;
        this.street = res.street;
        this.province = res.province;
        this.city = res.city;
        this.brgy = res.barangay;
        this.contactNo = res.contactNumber;
      }
    });
  }

  submit(invalid) {
    if (invalid) {
      return;
    }

    const { info } = this._currentUser.getUserInfo();
    const postData = {
      usersId: info.usersId,
      street: this.street,
      country: 'PH',
      province: this.province,
      city: this.city,
      brgy: this.brgy,
      contactNo: this.contactNo
    };
    this._users.addCustomerInfo(postData, this.customerId).subscribe(res => {
      if (res) {
        if (this.isUpdating) {
          info.otherId = res;
        }
        info.isComplete = '1';
        const newObj = {
          ...info
        };
        localStorage.setItem('currentUser', JSON.stringify(newObj));
        if (this.isUpdating) {
          this.router.navigate([this.returnUrl]);
        } else {
          this.router.navigate(['/']);
        }
      }
    });
  }

  provinceOnSelect(e: TypeaheadMatch): void {
    this.provinceCode = e.item.provCode;
    console.log('e', e);
    this.cities = this.cityList.filter(i => i.provCode === e.item.provCode);
  }

  cityOnSelect(e: TypeaheadMatch): void {
    this.cityCode = e.item.citymunCode;
    this.brgys = this.brgyList.filter(
      i => i.citymunCode === e.item.citymunCode
    );
  }

  brgyOnSelect(e: TypeaheadMatch): void {
    this.brgyCode = e.item.brgyCode;
  }

  getProvince() {
    this._options.getProvinceList().subscribe(res => {
      this.provinceList = res;
    });
  }

  getCity() {
    this._options.getCityList().subscribe(res => {
      this.cityList = res;
      this.cities = res;
    });
  }

  getBrgy() {
    this._options.getBrgyList().subscribe(res => {
      this.brgyList = res;
      this.brgys = res;
    });
  }
}

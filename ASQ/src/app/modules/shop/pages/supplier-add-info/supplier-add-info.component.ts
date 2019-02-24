import { Component, OnInit, ViewChild } from '@angular/core';
import { BusinessService, CurrentUserService } from '@shared/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supplier-add-info',
  templateUrl: './supplier-add-info.component.html',
  styleUrls: ['./supplier-add-info.component.scss']
})
export class SupplierAddInfoComponent implements OnInit {
  @ViewChild('businessForm') businessForm: HTMLFormElement;

  name;
  license;
  contactNo;
  address;

  supplierId: number;
  isUpdating: boolean = false;

  constructor(
    private router: Router,
    private _currentUser: CurrentUserService,
    private _businessApi: BusinessService
  ) {}

  ngOnInit() {
    this.getDetails();
  }

  getDetails() {
    const { info, isSupplier } = this._currentUser.getUserInfo();
    if (isSupplier) {
      this._businessApi.getSupplierInfo(info.usersId).subscribe(res => {
        this.isUpdating = true;
        this.supplierId = res.id;
        this.name = res.name;
        this.license = res.license;
        this.address = res.address;
        this.contactNo = res.contactNumber;
      });
    }
  }

  submit(status) {
    if (status) {
      return;
    }

    const { info } = this._currentUser.getUserInfo();

    const postData = {
      usersId: info.usersId,
      name: this.name,
      license: this.license,
      contactNo: this.contactNo,
      address: this.address
    };
    this._businessApi.saveInfo(postData, this.supplierId).subscribe(res => {
      if (res) {
        this.router.navigate(['/business']);
      }
    });
  }
}

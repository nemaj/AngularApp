import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Subject } from 'rxjs';
import { CropperSettings } from 'ngx-img-cropper';
import { BusinessService } from '@shared/services';

@Component({
  selector: 'app-update-supplier-logo',
  templateUrl: './update-supplier-logo.component.html',
  styleUrls: ['./update-supplier-logo.component.scss']
})
export class UpdateSupplierLogoComponent implements OnInit {
  public onClose: Subject<boolean>;
  businessId: number;
  data: any;
  cropperSettings: CropperSettings;

  constructor(
    private bsModalRef: BsModalRef,
    private _business: BusinessService
  ) {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 200;
    this.cropperSettings.height = 200;
    this.cropperSettings.croppedWidth = 200;
    this.cropperSettings.croppedHeight = 200;
    this.cropperSettings.canvasWidth = 450;
    this.cropperSettings.canvasHeight = 300;

    this.data = {};
  }

  ngOnInit() {
    this.onClose = new Subject();
  }

  saveLogo() {
    if (!this.data || !this.data.image) {
      return;
    }
    const postData = {
      businessId: this.businessId,
      logo: this.data.image
    };
    this._business.uploadLogo(postData).subscribe(res => {
      if (res) {
        this.close(true);
      }
    });
  }

  close(response = false) {
    this.onClose.next(response);
    this.bsModalRef.hide();
  }
}

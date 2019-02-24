import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Subject } from 'rxjs';

import * as fileUpload from 'fuctbase64';
import { MaterialsService } from '@shared/services';
import { FileUploader } from 'ng2-file-upload';

const URL = 'http://localhost:3000/api/upload';

@Component({
  selector: 'app-add-materials',
  templateUrl: './add-materials.component.html',
  styleUrls: ['./add-materials.component.scss']
})
export class AddMaterialsComponent implements OnInit {
  public onClose: Subject<boolean>;
  fileName;

  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'file'
  });

  constructor(
    private bsModalRef: BsModalRef,
    private _material: MaterialsService
  ) {}

  ngOnInit() {
    this.onClose = new Subject();
    this.uploader.onAfterAddingFile = file => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, response: any) => {
      if (response) {
        const { result } = JSON.parse(response);
        const fileType = item.file.type;
        const postData = {
          name: this.fileName,
          type: fileType,
          path: result
        };
        this._material.addMaterial(postData).subscribe(res => {
          if (res) {
            this.close(true);
          }
        });
      }
    };
  }

  close(response = false) {
    this.onClose.next(response);
    this.bsModalRef.hide();
  }
}

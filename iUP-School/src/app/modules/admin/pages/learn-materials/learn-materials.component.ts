import { Component, OnInit } from '@angular/core';
import { MaterialsService } from '@shared/services';
import { BsModalService } from 'ngx-bootstrap';
import { AddMaterialsComponent } from '../../components/modals/add-materials/add-materials.component';
import { ConfirmationComponent } from '@shared/components/modals/confirmation/confirmation.component';

import { ResponseContentType, Http, RequestOptions } from '@angular/http';
import { FileSaverService } from 'ngx-filesaver';

import { environment } from '@env/environment';

@Component({
  selector: 'app-learn-materials',
  templateUrl: './learn-materials.component.html',
  styleUrls: ['./learn-materials.component.scss']
})
export class LearnMaterialsComponent implements OnInit {
  materialList;

  constructor(
    private http: Http,
    private _FileSaverService: FileSaverService,
    private modalService: BsModalService,
    private _material: MaterialsService
  ) {}

  ngOnInit() {
    this.getList();
  }

  getList() {
    this._material.getMaterials().subscribe(res => {
      this.materialList = res;
    });
  }

  downloadDocs(item) {
    const options = new RequestOptions({
      responseType: ResponseContentType.Blob
    });

    this.http
      .get(`${environment.filePath}${item.file}`, options)
      .subscribe(res => {
        this._FileSaverService.save((<any>res)._body, item.name);
      });
  }

  addMaterial() {
    const initialState = {};
    const modalRef = this.modalService.show(AddMaterialsComponent, {
      initialState
    });
    (<AddMaterialsComponent>modalRef.content).onClose.subscribe(result => {
      if (result) {
        this.getList();
      }
    });
  }

  delete(item: any) {
    const initialState = {
      message: `Do you want to delete ${item.name} file?`
    };
    const modalRef = this.modalService.show(ConfirmationComponent, {
      initialState,
      keyboard: false,
      ignoreBackdropClick: true
    });
    (<ConfirmationComponent>modalRef.content).onClose.subscribe(result => {
      if (result === true) {
        this._material.removeFile(item.id).subscribe(res => {
          if (res) {
            this.getList();
          }
        });
      }
    });
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CurrentUserService,
  ProductsService,
  BusinessService
} from '@shared/services';
import { BsModalService, TabsetComponent } from 'ngx-bootstrap';

import { environment } from '@env/environment';

import { AddProductComponent } from '../../components/modals/add-product/add-product.component';

import { CropperSettings } from 'ngx-img-cropper';
import { ToastrService } from 'ngx-toastr';
import { UpdateSupplierLogoComponent } from '../../components/modals/update-supplier-logo/update-supplier-logo.component';
import { ConfirmationComponent } from '@shared/components/modals';

interface FileReaderEventTarget extends EventTarget {
  result: string;
}
interface FileReaderEvent extends Event {
  target: FileReaderEventTarget;
  getMessage(): string;
}

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {
  @ViewChild('supplierTabs') supplierTabs: TabsetComponent;
  @ViewChild('businessForm') businessForm: HTMLFormElement;
  @ViewChild('imageForm') imageForm: HTMLFormElement;

  businessUserId;
  businessId;
  businessInfo;
  productList: Array<any> = [];
  types: Array<any> = [];
  units: Array<any> = [];
  canManageBusinessInfo: boolean = false;
  isAddProductOpen: boolean = false;
  isUploadFormReady: boolean = false;
  productForm: any;

  // forms
  productName;
  productType = '';
  productUnit = '';
  productDesc;
  productPrice;
  productStock;

  productImages: Array<any> = [];

  file;

  afuConfig = {
    uploadAPI: {
      url: `${environment.baseUrl}/products/addProductImage.php`
    }
  };

  imageChangedEvent: any = '';
  croppedImage: any = '';

  data: any;
  cropperSettings: CropperSettings;

  constructor(
    private modalService: BsModalService,
    private activedRoute: ActivatedRoute,
    private router: Router,
    private _currentUser: CurrentUserService,
    private _product: ProductsService,
    private _business: BusinessService,
    private toastr: ToastrService
  ) {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 200;
    this.cropperSettings.height = 200;
    this.cropperSettings.croppedWidth = 300;
    this.cropperSettings.croppedHeight = 300;
    this.cropperSettings.canvasWidth = 400;
    this.cropperSettings.canvasHeight = 300;

    this.data = {};
  }

  ngOnInit() {
    this.businessUserId = this.activedRoute.snapshot.params.id || 0;
    this.checkBusiness(this.businessUserId);
    this.getProductType();
    this.getProductUnit();
    this.checkCreateProduct();
    this.getImages();
  }

  getInfo() {
    if (this.canManageBusinessInfo) {
      this._business.getSupplierInfo(this.businessUserId).subscribe(res => {
        this.businessInfo = res;
        this.businessId = res.id;
        this.getProductList(res.id);
      });
    } else {
      this._business.getSupplierInfoById(this.businessUserId).subscribe(res => {
        this.businessInfo = res;
        this.businessId = res.id;
        this.getProductList(res.id);
      });
    }
  }

  getProductList(id: number) {
    this._product.getProductsListEachSupplier(id).subscribe(res => {
      this.productList = res;
    });
  }

  getImages() {
    if (this.productForm.productId) {
      this._product
        .getProductImages(this.productForm.productId)
        .subscribe(res => {
          this.productImages = res || [];
        });
    }
  }

  deleteImage(id: number) {
    if (id) {
      this._product.removeImage(id).subscribe(res => {
        if (res) {
          this.getImages();
        }
      });
    }
  }

  addImage() {
    const initialState = {
      productId: this.productForm.productId
    };
    const modalRef = this.modalService.show(AddProductComponent, {
      initialState,
      class: 'shop-modal'
    });
    (<AddProductComponent>modalRef.content).onClose.subscribe(result => {
      if (result === true) {
        this.getProductList(this.businessId);
        this.getImages();
      }
    });
  }

  saveProduct() {
    if (!this.productImages.length) {
      this.toastr.warning('Please add image!');
      return;
    }
    this.saveProductInfo(false, true);
    this.getProductList(this.businessId);
    localStorage.removeItem('productForm');
    this.isAddProductOpen = false;
    this.selectTab(0);
    this.productName = '';
    this.productType = '';
    this.productUnit = '';
    this.productDesc = '';
    this.productPrice = '';
    this.productStock = '';
  }

  getProductType() {
    this._product.getTypes().subscribe(res => {
      this.types = res;
    });
  }

  getProductUnit() {
    this._product.getUnits().subscribe(res => {
      this.units = res;
      console.log('units', this.units);
    });
  }

  selectTab(tabId: number) {
    this.supplierTabs.tabs[tabId].active = true;
  }

  checkBusiness(id: number = 0) {
    this.canManageBusinessInfo = !id;
    if (!id) {
      const { isSupplier, info } = this._currentUser.getUserInfo();
      if (!isSupplier) {
        this.router.navigate(['/']);
      }
      this.businessUserId = info.usersId;
    }
    this.getInfo();
  }

  saveProductInfo(status: any, finish: boolean = false) {
    if (status) {
      return;
    }
    const postData = {
      name: this.productName,
      type: this.productType,
      unit: this.productUnit,
      desc: this.productDesc,
      price: this.productPrice,
      stock: this.productStock,
      business_id: this.businessId
    };
    const postId = (this.productForm && this.productForm.productId) || 0;
    this._product.saveProduct(postData, postId).subscribe(res => {
      if (res && !finish) {
        this.productForm = {
          isReady: true,
          productId: res
        };
        localStorage.setItem('productForm', JSON.stringify(this.productForm));
        this.isUploadFormReady = true;
        this.toastr.success('Product details saved.');
      }
    });
  }

  checkCreateProduct() {
    this.productForm = JSON.parse(localStorage.getItem('productForm')) || {};
    this.isUploadFormReady =
      (this.productForm && this.productForm.productId) || false;
    if (this.productForm && this.productForm.isReady) {
      if (this.isUploadFormReady) {
        this.getProductFromDetails(this.productForm.productId);
      }
      this.isAddProductOpen = true;
      setTimeout(() => {
        this.selectTab(2);
      }, 500);
    }
  }

  getProductFromDetails(id: number) {
    this._product.getEactProduct(id).subscribe(res => {
      if (res) {
        this.productName = res.name;
        this.productType = res.type;
        this.productUnit = res.unit || '';
        this.productDesc = res.description;
        this.productPrice = res.price;
        this.productStock = res.stock;
      }
    });
  }

  editProduct(id: number) {
    this.isAddProductOpen = true;
    this.productForm = {
      isReady: true,
      productId: id
    };
    localStorage.setItem('productForm', JSON.stringify(this.productForm));
    setTimeout(() => {
      this.selectTab(2);
      this.isUploadFormReady = true;
      this.getProductFromDetails(id);
      this.getImages();
    }, 500);
  }

  addProduct() {
    if (this.isAddProductOpen) {
      this.selectTab(2);
      return;
    }
    this.isAddProductOpen = true;
    const obj = {
      isReady: true
    };
    localStorage.setItem('productForm', JSON.stringify(obj));
    setTimeout(() => {
      this.selectTab(2);
    }, 500);
  }

  updateLogo() {
    const initialState = {
      businessId: this.businessId
    };
    const modalRef = this.modalService.show(UpdateSupplierLogoComponent, {
      initialState,
      class: 'shop-modal'
    });
    (<UpdateSupplierLogoComponent>modalRef.content).onClose.subscribe(
      result => {
        if (result === true) {
          this.getInfo();
        }
      }
    );
  }

  cancel() {
    localStorage.removeItem('productForm');
    this.isAddProductOpen = false;
    this.selectTab(0);
    this.productName = '';
    this.productType = '';
    this.productUnit = '';
    this.productDesc = '';
    this.productPrice = '';
    this.productStock = '';
  }

  deleteProduct(productId) {
    const initialState = {
      message: `Do you want to delete this product?`
    };
    const modalRef = this.modalService.show(ConfirmationComponent, {
      initialState,
      class: 'shop-modal'
    });
    (<ConfirmationComponent>modalRef.content).onClose.subscribe(result => {
      if (result === true) {
        this._product.removeProduct(productId).subscribe(res => {
          if (res) {
            this.getProductList(this.businessId);
          }
        });
      }
    });
  }
}

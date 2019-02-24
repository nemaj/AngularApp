import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewChecked
} from '@angular/core';
import {
  SocketService,
  ChatService,
  BusinessService,
  CurrentUserService
} from '@shared/services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('content') private myScrollContainer: ElementRef;

  supplierId: number;
  messageInfoName: string;
  customerInfoId: number;
  supplierInfoId: number;
  usersRole: any;
  chatMessages: Array<any> = [];
  listUsers: Array<any> = [];

  isSupplier: boolean = false;

  // form
  message;

  constructor(
    private activedRoute: ActivatedRoute,
    private router: Router,
    private _business: BusinessService,
    private _currentUser: CurrentUserService,
    private _chat: ChatService
  ) {}

  ngOnInit() {
    this.supplierId = this.activedRoute.snapshot.params.id || 0;
    this.checkInfo();
    this.scrollToBottom();
    this._chat.messages.subscribe(msg => {
      const userObj = {
        ...JSON.parse(msg),
        senderRole: JSON.parse(msg).role,
        date: new Date()
      };
      if (
        (this.isSupplier && this.customerInfoId === userObj.customerId) ||
        !this.isSupplier
      ) {
        this.chatMessages.push(userObj);
      }
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  checkInfo() {
    const { info, isCustomer, isSupplier } = this._currentUser.getUserInfo();
    this.isSupplier = isSupplier;
    if (!this.supplierId && !isSupplier) {
      this.router.navigate(['/']);
    } else if (!info.otherId && isCustomer) {
      this.router.navigate(['/customer-info']);
    }
    this.usersRole = info.role;
    if (isCustomer) {
      this.customerInfoId = +info.otherId;
      this.supplierInfoId = +this.supplierId;
      this.getSupplierInfo(info.otherId);
    } else if (isSupplier) {
      this.supplierInfoId = +info.otherId;
      this.getUsers(+info.otherId);
    }
  }

  getUsers(id: number) {
    this._chat.getUsers(id).subscribe(res => {
      if (res && res.length) {
        this.listUsers = res;
        this.listUsers[0].isSelected = true;
        this.messageInfoName = this.listUsers[0].customerName;
        this.customerInfoId = +this.listUsers[0].customer_id;
        this.getMessages(this.customerInfoId, id);
      }
    });
  }

  getSupplierInfo(customerId: number) {
    this._business.getSupplierInfoById(this.supplierId).subscribe(res => {
      this.messageInfoName = res.name;
      this.getMessages(customerId, res.id);
    });
  }

  getMessages(customerId: number, businessId: number) {
    const postData = {
      customerId,
      businessId
    };
    this._chat.getMessages(postData).subscribe(res => {
      if (res && res.length) {
        this.chatMessages = res;
      }
    });
  }

  sendMessage() {
    if (!this.message) {
      return;
    }
    const postData = {
      customerId: this.customerInfoId,
      businessId: this.supplierInfoId,
      role: this.usersRole,
      message: this.message
    };

    this._chat.writeMessage(postData).subscribe(res => {
      if (res) {
        this._chat.sendMsg(postData);
        this.message = '';
      }
    });
  }

  selectUser(idx: number) {
    this.listUsers.map(i => {
      i.isSelected = false;
      return i;
    });
    this.listUsers[idx].isSelected = true;
    this.messageInfoName = this.listUsers[idx].customerName;
    this.customerInfoId = +this.listUsers[idx].customer_id;
    this.getMessages(this.customerInfoId, this.supplierInfoId);
  }

  enterKey(evt) {
    if (evt.keyCode === 13) {
      this.sendMessage();
    }
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }
}

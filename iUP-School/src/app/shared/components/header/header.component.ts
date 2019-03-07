import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { AppLoadService, UsersService, AuthService } from '@shared/services';
import { BsModalService } from 'ngx-bootstrap';
import { AccountSettingComponent } from '../modals/account-setting/account-setting.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuStyle: Object;
  isMenuFixed: boolean = false;

  userStatus;

  openClassyMenu: boolean = false;

  isLogin: boolean = false;
  username: string = '';
  accountName: string = '';

  @HostListener('window:scroll', ['$event'])
  doSomething() {
    if (window.pageYOffset >= 97) {
      this.menuStyle = {
        position: 'fixed',
        top: '0px',
        'z-index': 'inherit'
      };
      this.isMenuFixed = true;
    } else {
      this.menuStyle = {};
      this.isMenuFixed = false;
    }
  }

  constructor(
    private modalService: BsModalService,
    private _load: AppLoadService,
    private _auth: AuthService,
    private _users: UsersService
  ) {}

  ngOnInit() {
    const { isLogin, username, status } = this._load.getUserInfo();
    this.isLogin = isLogin;
    if (isLogin) {
      this.username = username;
      this.userStatus = status;
      console.log('userStatus', this.userStatus);
      this.getInfo(username);
    }
  }

  getInfo(username) {
    this._users.getUsersInfo(username).subscribe(res => {
      this.accountName = `${res.firstName} ${res.lastName}`;
    });
  }

  accountSettings() {
    const modalRef = this.modalService.show(AccountSettingComponent, {
      keyboard: false,
      ignoreBackdropClick: true
    });
    (<AccountSettingComponent>modalRef.content).onClose.subscribe(result => {
      if (result === true) {
        console.log('ok');
      }
    });
  }

  logout() {
    this._auth.logout();
  }

  toggleClassyMenu() {
    this.openClassyMenu = !this.openClassyMenu;
  }
}

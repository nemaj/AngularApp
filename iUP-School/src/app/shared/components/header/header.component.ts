import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { AppLoadService, UsersService, AuthService } from '@shared/services';

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

  logout() {
    this._auth.logout();
  }

  toggleClassyMenu() {
    this.openClassyMenu = !this.openClassyMenu;
  }
}

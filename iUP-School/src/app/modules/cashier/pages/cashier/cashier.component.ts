import { Component, OnInit } from '@angular/core';
import { AuthService } from '@shared/services';

@Component({
  selector: 'app-cashier',
  templateUrl: './cashier.component.html',
  styleUrls: ['./cashier.component.scss']
})
export class CashierComponent implements OnInit {
  constructor(private _auth: AuthService) {}

  ngOnInit() {}

  logout() {
    this._auth.logout();
  }
}

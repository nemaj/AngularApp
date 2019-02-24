import { Component, OnInit } from '@angular/core';
import { AuthService } from '@shared/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.scss']
})
export class WarningComponent implements OnInit {
  constructor(private router: Router, private _auth: AuthService) {}

  ngOnInit() {}

  logout() {
    this._auth.logout();
    this.router.navigate(['/']);
  }
}

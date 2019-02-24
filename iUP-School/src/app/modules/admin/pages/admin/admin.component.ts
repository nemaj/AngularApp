import { Component, OnInit } from '@angular/core';
import { AuthService } from '@shared/services';
import { ActivatedRoute, Router, ActivationEnd } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  copyrightYear = new Date().getFullYear();
  pageTitle;

  constructor(private router: Router, private _auth: AuthService) {
    router.events.subscribe(event => {
      if (
        event instanceof ActivationEnd &&
        event.snapshot.data &&
        event.snapshot.data.pageTitle
      ) {
        this.pageTitle = event.snapshot.data.pageTitle;
      }
    });
  }

  ngOnInit() {}

  logout() {
    this._auth.logout();
  }
}

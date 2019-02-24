import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  _opened: boolean = true;
  _mode: string = 'push';

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth <= 767) {
      this._mode = 'over';
      this._opened = false;
    } else {
      this._mode = 'push';
      this._opened = true;
    }
  }

  constructor() {
    if (window.screen.width <= 767) {
      this._mode = 'over';
      this._opened = false;
    }
  }

  ngOnInit() {}

  _toggleSidebar() {
    this._opened = !this._opened;
  }
}

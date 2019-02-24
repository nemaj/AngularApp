import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Output() close = new EventEmitter();
  isProductActive: boolean = false;

  constructor(private router: Router) {
    router.events.subscribe(val => {
      this.checkActiveRoutes(router.url);
    });
  }

  ngOnInit() {}

  checkActiveRoutes(url) {
    this.isProductActive = url === '/admin/product-type' || false;
  }

  goTo(url: String) {
    this.router.navigate([`/admin/${url}`]);
    if (window.innerWidth < 768) {
      this.closeSidebar();
    }
  }

  closeSidebar() {
    this.close.emit();
  }
}

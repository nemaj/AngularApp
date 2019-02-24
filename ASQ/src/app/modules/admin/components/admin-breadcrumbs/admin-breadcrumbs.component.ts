import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-admin-breadcrumbs',
  templateUrl: './admin-breadcrumbs.component.html',
  styleUrls: ['./admin-breadcrumbs.component.scss']
})
export class AdminBreadcrumbsComponent implements OnInit {
  @Input() page: string;

  constructor() {}

  ngOnInit() {}
}

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { UsersService, ReportsService } from '@shared/services';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

import { AddUserComponent } from '../../components/modals/add-user/add-user.component';

import { ROLES } from '@shared/constants/users';
import { ConfirmationComponent } from '@shared/components/modals';
import * as jsPDF from 'jspdf';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('chart') private chart: ElementRef;
  breadcrumbs: string;

  modalRef: BsModalRef;
  data: Array<any> = [];
  search;

  isReady: boolean = false;

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            stepSize: 100,
            callback: function(value) {
              return `₱${value}`;
            }
          }
        }
      ]
    }
  };
  public barChartType = 'bar';
  public barChartLegend = false;
  public barChartLabels = [];
  public barChartData = [{ data: [] }];

  constructor(
    private activatedRoute: ActivatedRoute,
    private modalService: BsModalService,
    private _users: UsersService,
    private _reports: ReportsService
  ) {}

  ngOnInit() {
    this.breadcrumbs = this.activatedRoute.snapshot.data.page || '';
    this.getCollection();
  }

  getCollection() {
    this._reports.getCollectionChart().subscribe(res => {
      if (res && res.length) {
        res.forEach(item => {
          this.barChartLabels.push(item.date);
          this.barChartData[0].data.push(+item.total);
        });
        this.isReady = true;
      }
    });
  }

  addUser(id = 0, isEdit = false) {
    const initialState = {
      isEdit: isEdit,
      usersId: id
    };
    const modalRef = this.modalService.show(AddUserComponent, { initialState });
    (<AddUserComponent>modalRef.content).onClose.subscribe(result => {
      if (result === true) {
        this.getUsers();
      }
    });
  }

  deleteUser(user) {
    const initialState = {
      message: `Do you want to delete
      ${user.role} ${user.lastName}
      from the list?`
    };
    const modalRef = this.modalService.show(ConfirmationComponent, {
      initialState,
      class: 'shop-modal'
    });
    (<ConfirmationComponent>modalRef.content).onClose.subscribe(result => {
      if (result === true) {
        this._users.deleteUser(user.id).subscribe(res => {
          if (res) {
            this.getUsers();
          }
        });
      }
    });
  }

  getUsers() {
    this._users.getUsers().subscribe(data => {
      if (data && data.length) {
        this.data = data;
      }
    });
  }

  printChart() {
    // const newCanvasImg = this.chart.nativeElement.toDataURL('image/jpeg', 1.0);
    // const doc = new jsPDF('landscape');
    // doc.setFontSize(20);
    // doc.text(15, 15, 'Super Cool Chart');
    // doc.addImage(newCanvasImg, 'JPEG', 10, 10, 280, 150);
    // doc.save('sampleChart.pdf');

    const columns = ['ID', 'Name', 'Country'];
    const rows = [
      [1, 'Shaw', 'Tanzania'],
      [2, 'Nelson', 'Kazakhstan'],
      [3, 'Garcia', 'Madagascar']
    ];
    const doc = new jsPDF('p', 'pt', 'letter', true);
    const totalPagesExp = '{total_pages_count_string}';

    const pageContent = function(data) {
      // HEADER
      doc.setFontSize(18);
      doc.setFontStyle('normal');
      doc.text('Header Report', 40, 30);

      // FOOTER
      let str = 'Page ' + data.pageCount;
      // Total page number plugin only available in jspdf v1.0+
      if (typeof doc.putTotalPages === 'function') {
        str = str + ' of ' + totalPagesExp;
      }
      doc.setFontSize(10);
      doc.text(
        str,
        data.settings.margin.left,
        doc.internal.pageSize.height - 10
      );
    };

    const options = {
      addPageContent: pageContent,
      margin: {
        top: 45
      }
    };

    doc.autoTable(columns, rows, options);
    doc.autoTable(columns, rows, {
      startY: doc.autoTableEndPosY() + 20
    });
    if (typeof doc.putTotalPages === 'function') {
      doc.putTotalPages(totalPagesExp);
    }
    doc.save('table.pdf');
  }
}

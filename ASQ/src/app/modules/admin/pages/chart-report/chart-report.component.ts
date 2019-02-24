import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportsService } from '@shared/services';

import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-chart-report',
  templateUrl: './chart-report.component.html',
  styleUrls: ['./chart-report.component.scss']
})
export class ChartReportComponent implements OnInit {
  @ViewChild('chartCollection') private chartCollection: ElementRef;
  public context: CanvasRenderingContext2D;
  breadcrumbs: string;
  type: string;

  isCollection: boolean = false;
  listCollection: Array<any>;
  isCustomer: boolean = false;
  listCustomer: Array<any>;

  chartReady;

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
  public collectionLabels = [];
  public collectionData = [
    {
      data: []
    }
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
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
          this.collectionLabels.push(item.date);
          this.collectionData[0].data.push(+item.total);
        });
        this.isCollection = true;
      }
    });
  }

  print() {
    const newCanvasImg = this.chartCollection.nativeElement.toDataURL();

    const doc = new jsPDF('landscape');
    doc.setFontSize(20);
    doc.text('Collection Report', 10, 15);
    doc.addImage(newCanvasImg, 'JPEG', 10, 25, 280, 150);
    doc.save('collectionChart.pdf');
  }
}

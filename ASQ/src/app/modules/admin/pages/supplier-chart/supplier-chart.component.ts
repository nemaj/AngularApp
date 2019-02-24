import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportsService } from '@shared/services';

import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-supplier-chart',
  templateUrl: './supplier-chart.component.html',
  styleUrls: ['./supplier-chart.component.scss']
})
export class SupplierChartComponent implements OnInit {
  @ViewChild('chartSupplier') private chartSupplier: ElementRef;
  breadcrumbs: string;
  type: string;

  isSupplier: boolean = false;
  listSupplier: Array<any>;

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            stepSize: 1
          }
        }
      ]
    }
  };
  public barChartType = 'bar';
  public barChartLegend = false;
  public barChartLabels = [];
  public barChartData = [
    {
      data: []
    }
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private _reports: ReportsService
  ) {}

  ngOnInit() {
    this.breadcrumbs = this.activatedRoute.snapshot.data.page || '';
    this.getData();
  }

  getData() {
    this._reports.getSupplierChart().subscribe(res => {
      if (res && res.length) {
        res.forEach(item => {
          this.barChartLabels.push(item.date);
          this.barChartData[0].data.push(+item.usersCount);
        });
        this.isSupplier = true;
      }
    });
  }

  print() {
    const newCanvasImg = this.chartSupplier.nativeElement.toDataURL();

    const doc = new jsPDF('landscape');
    doc.setFontSize(20);
    doc.text('Register Supplier Report', 10, 15);
    doc.addImage(newCanvasImg, 'JPEG', 10, 25, 280, 150);
    doc.save('supplierChart.pdf');
  }
}

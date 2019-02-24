import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportsService } from '@shared/services';

import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-farmer-chart',
  templateUrl: './farmer-chart.component.html',
  styleUrls: ['./farmer-chart.component.scss']
})
export class FarmerChartComponent implements OnInit {
  @ViewChild('chartCustomer') private chartCustomer: ElementRef;
  breadcrumbs: string;
  type: string;

  isCustomer: boolean = false;
  listCustomer: Array<any>;

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
    this._reports.getCustomerChart().subscribe(res => {
      if (res && res.length) {
        res.forEach(item => {
          this.barChartLabels.push(item.date);
          this.barChartData[0].data.push(+item.usersCount);
        });
        this.isCustomer = true;
      }
    });
  }

  print() {
    const newCanvasImg = this.chartCustomer.nativeElement.toDataURL();

    const doc = new jsPDF('landscape');
    doc.setFontSize(20);
    doc.text('Register Farmer Report', 10, 15);
    doc.addImage(newCanvasImg, 'JPEG', 10, 25, 280, 150);
    doc.save('farmerChart.pdf');
  }
}

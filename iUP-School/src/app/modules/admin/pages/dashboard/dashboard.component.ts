import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ReportsService } from '@shared/services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('chartCollection') private chartCollection: ElementRef;
  public context: CanvasRenderingContext2D;
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
            max: 5000,
            min: 0,
            stepSize: 1000,
            callback: function(value) {
              return `₱${value}`;
            }
          }
        }
      ]
    }
  };
  public barChartType = 'line';
  public barChartLegend = false;
  public collectionLabels = [];
  public collectionData = [
    {
      data: []
    }
  ];

  pupilPercent: number = 0;

  constructor(private _reports: ReportsService) {}

  ngOnInit() {
    this.getCollection();
    this.getPupilPercentage();
  }

  getCollection() {
    this._reports.incomeChart().subscribe(res => {
      if (res && res.length) {
        let max = 0;
        res.forEach(item => {
          if (max < +item.amount) {
            max = +item.amount;
          }
          this.collectionLabels.push(item.month);
          this.collectionData[0].data.push(+item.amount);
        });
        this.setOptions(max);
      }
    });
  }

  setOptions(stat) {
    let maxStat = 5000;
    if (stat > 4000) {
      maxStat = stat + 1000;
    }
    this.barChartOptions = {
      scaleShowVerticalLines: false,
      responsive: true,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              max: maxStat,
              min: 0,
              stepSize: 1000,
              callback: function(value) {
                return `₱${value}`;
              }
            }
          }
        ]
      }
    };
    this.isCollection = true;
  }

  getPupilPercentage() {
    this._reports.getPupilsPercentage().subscribe(res => {
      this.pupilPercent = (res && res.value) || 0;
    });
  }
}

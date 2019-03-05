import { Component, OnInit } from '@angular/core';
import { ReportsService, PrintService } from '@shared/services';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  enrolledPupils: Array<any> = [];
  preEnrolledPupils: Array<any> = [];
  teachers: Array<any> = [];
  schedules: Array<any> = [];
  incomes: Array<any> = [];

  constructor(private _reports: ReportsService, private _print: PrintService) {}

  ngOnInit() {
    this.getEnrolled();
    this.getPreEnrolled();
    this.getTeachers();
    this.getClassSchedules();
    this.getIncome();
  }

  getEnrolled() {
    this._reports.getEnrolled().subscribe(res => {
      this.enrolledPupils = res;
    });
  }

  printEnrolled() {
    const columns = ['Name', 'Sex', 'Grade Level'];
    const rows = [];
    this.enrolledPupils.forEach((item, idx) => {
      const arr = [
        `${item.lastName}, ${item.firstName} ${item.middleName}`,
        item.sex,
        item.gradeLevel
      ];
      rows.push(arr);
    });
    this._print.generate('List of Registered Pupils', columns, rows);
  }

  getPreEnrolled() {
    this._reports.getPreEnrolled().subscribe(res => {
      this.preEnrolledPupils = res;
    });
  }

  printPreEnrolled() {
    const columns = ['Name', 'Sex', 'Grade Level'];
    const rows = [];
    this.preEnrolledPupils.forEach((item, idx) => {
      const arr = [
        `${item.firstName} ${item.lastName}`,
        item.sex,
        item.gradeLevel
      ];
      rows.push(arr);
    });
    this._print.generate('Pre-listed Pupils', columns, rows);
  }

  getTeachers() {
    this._reports.getTeachers().subscribe(res => {
      this.teachers = res;
    });
  }

  printTeachers() {
    const columns = ['Name', 'Sex', 'Advisory'];
    const rows = [];
    this.teachers.forEach((item, idx) => {
      const arr = [
        `${item.firstName} ${item.lastName}`,
        item.sex,
        item.advisory
      ];
      rows.push(arr);
    });
    this._print.generate('List of Teachers', columns, rows);
  }

  getClassSchedules() {
    this._reports.getClassSchedules().subscribe(res => {
      this.schedules = res;
    });
  }

  printSchedules() {
    this._print.printSchedules(this.schedules);
  }

  getIncome() {
    this._reports.getFinancialIncome().subscribe(res => {
      this.incomes = res;
    });
  }

  printIncome() {
    const columns = ['OR No.', 'Pupil', 'Amount', 'Date'];
    const rows = [];
    this.incomes.forEach((item, idx) => {
      const arr = [item.or_num, item.pupilName, item.amount, item.formatDate];
      rows.push(arr);
    });
    this._print.generate('Financial Income', columns, rows);
  }
}

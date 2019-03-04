import { Component, OnInit } from '@angular/core';
import { AuthService, ReportsService, PrintService } from '@shared/services';

@Component({
  selector: 'app-cashier',
  templateUrl: './cashier.component.html',
  styleUrls: ['./cashier.component.scss']
})
export class CashierComponent implements OnInit {
  accounts: Array<any> = [];

  constructor(
    private _auth: AuthService,
    private _reports: ReportsService,
    private _print: PrintService
  ) {}

  ngOnInit() {
    this.getAccounts();
  }

  getAccounts() {
    this._reports.getPupilsAccount().subscribe(res => {
      console.log('accounts', res);
      this.accounts = res;
    });
  }

  print() {
    const columns = ['Name', 'Sex', 'Grade Level', 'Paid', 'Back Accounts'];
    const rows = [];
    this.accounts.forEach((item, idx) => {
      const arr = [
        `${item.firstName} ${item.lastName} ${item.middleName}`,
        item.sex,
        item.gradeLevel,
        item.paid ? 'Paid' : 'Unpaid',
        item.bankAccount
      ];
      rows.push(arr);
    });
    this._print.generate('List of Pupils Account', columns, rows);
  }

  logout() {
    this._auth.logout();
  }
}

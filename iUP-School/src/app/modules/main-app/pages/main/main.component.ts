import { Component, OnInit } from '@angular/core';
import { AppLoadService } from '@shared/services';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  constructor(private _user: AppLoadService) {}

  ngOnInit() {
    console.log(this._user.getUserInfo());
  }
}

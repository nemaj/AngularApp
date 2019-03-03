import { Component, OnInit } from '@angular/core';
import { OptionsService, PupilsService } from '@shared/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-pupils',
  templateUrl: './list-pupils.component.html',
  styleUrls: ['./list-pupils.component.scss']
})
export class ListPupilsComponent implements OnInit {
  level = '';
  gradeLevels: Array<any> = [];
  listOfPupils: Array<any> = [];

  constructor(
    private router: Router,
    private _options: OptionsService,
    private _pupils: PupilsService
  ) {}

  ngOnInit() {
    this.getLevel();
  }

  getLevel() {
    this._options.getLevel().subscribe(res => {
      this.gradeLevels = res;
    });
  }

  getPupils(levelId) {
    if (levelId) {
      this._pupils.getPupilByLevel(levelId).subscribe(res => {
        this.listOfPupils = res;
      });
    }
  }

  selectLevel(value) {
    this.getPupils(value);
  }

  select(item) {
    this.router.navigate([`/cashier/account/${item.id}`]);
  }
}

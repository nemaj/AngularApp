import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  readonlyValue: boolean;
  isLabelShow: boolean;

  @Output() getRate = new EventEmitter();

  @Input()
  showLabel: boolean;

  @Input()
  rate: number;

  @Input()
  readonly: boolean;

  starStyle: any;
  @Input()
  set size(value: string) {
    this.starStyle =
      value === 'sm' ? { 'font-size': '1rem' } : { 'font-size': '2rem' };
  }

  constructor() {}

  ngOnInit() {}

  checkRating() {
    this.getRate.emit({ newRate: this.rate });
  }

  isRatingLabelShow() {
    return !!(this.showLabel && this.rate);
  }
}

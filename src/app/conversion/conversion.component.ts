import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { UserState } from '../store/user/user.state';
import { ConvertPipe } from './../shared/pipes/convert.pipe'

@Component({
  selector: 'conversion',
  templateUrl: './conversion.component.html',
  styleUrls: ['./conversion.component.scss'],
  providers: [ConvertPipe]
})
export class ConversionComponent implements OnInit {
  @Input() currencyVal;
  //  @Input() currencyCode: string;
  //  @Input() finacialValue: number;
  // currentVal: number;
  // buttons: Array<string>;
  // unit: string;
  // currencyVal: Object;
  // rateList: any;
  constructor(private store: Store, private converterpipe: ConvertPipe) {
    // this.rateList = this.store.selectSnapshot(UserState.rateList);
    // this.currentVal = 1;
    // this.unit = 'USD';
    // this.buttons = Object.keys(this.rateList);
    // this.currencyVal = {};
    console.warn("1 curren vale :", this.currencyVal);
  }

  ngOnInit() {
    console.warn("2 curren vale :", this.currencyVal);
    // this.convert(this.finacialValue, this.currencyCode);
  }

  // convert(val, unit) {
  //   this.currencyVal = this.converterpipe.transform(val, unit);
  //   console.warn("curren vale :", this.currencyVal);
  // }



}
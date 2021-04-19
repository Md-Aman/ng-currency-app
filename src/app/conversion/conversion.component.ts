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

  constructor() {
  }

  ngOnInit() {

  }




}
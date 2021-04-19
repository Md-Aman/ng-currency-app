import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { DELETE_PREFER_CURRENCY, STORE_PREFER_CURRENCY } from '../store/user/user.action';
import { UserState } from '../store/user/user.state';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  @Select(UserState.filteredCurrencyList) filteredCurrencyList$;
  @Select(UserState.preferCurrencies) preferCurrencies$;

  currencyForm: FormGroup;
  currencyList: any = [];

  constructor(private store: Store,
    private formBuilder: FormBuilder) { }


  ngOnInit(): void {
    this.inItForm();
    this.currencyList = this.store.selectSnapshot(UserState.currencyList);
  }

  inItForm() {
    this.currencyForm = this.formBuilder.group({
      currency: ['']
    });
  }

  onSelectedCurrency() {
    const selectedCurrency = this.currencyList.find(i => i.code === this.currencyForm.getRawValue().currency)
    this.store.dispatch(new STORE_PREFER_CURRENCY(selectedCurrency)).subscribe(state => {
      this.currencyForm.reset();
      this.setFormField();
    })
  }

  deletePreferCurrency(index) {
    this.store.dispatch(new DELETE_PREFER_CURRENCY(index)).subscribe(state => {
      this.setFormField();
    })
  }

  setFormField() {
    const preferList = this.store.selectSnapshot(UserState.preferCurrencies)
    if (preferList && (preferList.length >= 10)) {
      this.currencyForm.controls.currency.disable();
    } else {
      this.currencyForm.controls.currency.enable();
    }
    this.currencyForm.controls.currency.updateValueAndValidity();
  }

}

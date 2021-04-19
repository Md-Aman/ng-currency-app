import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { ConvertPipe } from '../shared/pipes/convert.pipe';
import { GET_CURRENCY_LIST } from '../store/user/user.action';
import { UserState } from '../store/user/user.state';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss'],
  providers: [ConvertPipe]
})
export class CurrencyComponent implements OnInit {
  @Select(UserState.preferCurrencies) preferCurrencies$;
  @Select(UserState.currencyList) currencyList$;
  currencyForm: FormGroup;
  isSelectedFromCurrency: boolean = false;
  isAmountValid: boolean = false;
  currentVal: number;
  unit: string;
  currencyVal: Array<any>;
  rateList: any;

  constructor(private store: Store,
    private formBuilder: FormBuilder,
    private converterpipe: ConvertPipe) {
    this.rateList = this.store.selectSnapshot(UserState.rateList);
  }


  ngOnInit(): void {
    this.inItForm();
  }


  get f() { return this.currencyForm.controls; }

  inItForm() {
    this.currencyForm = this.formBuilder.group({
      from_currency: ['', [Validators.required]],
      financial_amount: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
    });

    this.onChangeFormValue();
  }

  onChangeFormValue() {
    this.currencyForm.valueChanges.subscribe(val => {
      const ctrlFrom_Currency = this.currencyForm.controls.from_currency;
      const ctrlFinancialAmount = this.currencyForm.controls.financial_amount;
      if (ctrlFinancialAmount.value) {
        if (ctrlFinancialAmount.invalid) {
          this.isAmountValid = true;
        }
      }

      if (ctrlFinancialAmount.valid) {
        if (ctrlFrom_Currency.invalid) {
          this.isSelectedFromCurrency = true;
        } else {
          this.convert(ctrlFinancialAmount.value, ctrlFrom_Currency.value)
        }
      }
    });
  }


  convert(val, unit) {
    this.currencyVal = this.converterpipe.transform(val, unit);
  }

}

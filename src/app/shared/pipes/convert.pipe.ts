import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngxs/store';
import { UserState } from 'src/app/store/user/user.state';
@Pipe({
   name: 'convert'
})
export class ConvertPipe implements PipeTransform {
   rates: any;
   rateArray: any = [];
   index: number;
   selected: any;
   constructor(private store: Store,) {

   }
   transform(value: any, args?: any): any {
      let preferCurrencyList = this.store.selectSnapshot(UserState.preferCurrencies);
      let rateList = this.store.selectSnapshot(UserState.rateList);
      if (preferCurrencyList && preferCurrencyList.length > 0) {
         this.rates = preferCurrencyList.map(item => {
            rateList.forEach(element => {
               if (item.code === element.code) {
                  item = {
                     ...item,
                     rate: element.rate
                  };
                  return item;
               }
               return item
            });
            return item;
         });
      }
      this.selected = rateList.find(i => i.code === args).rate;
      if (this.rates && this.rates.length > 0) {
         this.rates.forEach((element, i) => {
            this.rates[i].rate = ((this.rates[i].rate / this.selected) * value).toFixed(2);
         });
      }
      return this.rates;
   }
}
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpHelperService } from 'src/app/shared/services/http-helper/http-helper.service';
import { environment as ENV } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currency_api = 'https://currencyapi.net/api/v1/';

  constructor(private httpHelperService: HttpHelperService) { }


  getCurrencyList(): Observable<any> {
    return this.httpHelperService.get(this.currency_api + 'currencies?key=' + ENV.CURRENCY_API_KEY);
  }

  getCurrencyRateList(): Observable<any> {
    return this.httpHelperService.get(this.currency_api + 'rates?key=' + ENV.CURRENCY_API_KEY);
  }







}

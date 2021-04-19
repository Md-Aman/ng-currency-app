import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { environment as env } from '../environments/environment';
import { HttpHelperService } from './shared/services/http-helper/http-helper.service';
import { GET_CURRENCY_LIST, GET_RATE_LIST } from './store/user/user.action';
import { UserState } from './store/user/user.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @Select(UserState.isLoggedIn) isLoggedIn$;

  constructor(private store: Store, private httpHelperService: HttpHelperService) {
    this.httpHelperService.setEnv(env.apiUrl);
    this.store.dispatch(new GET_CURRENCY_LIST);
    this.store.dispatch(new GET_RATE_LIST);
  }


}

import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { LOG_OUT_USER } from '../store/user/user.action';
import { UserState } from '../store/user/user.state';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() isLoggedIn: boolean;
  title = 'currency-app';

  constructor(private store: Store, private router: Router) { }

  ngOnInit(): void {
  }

  logOut() {
    this.store.dispatch(new LOG_OUT_USER);
    this.router.navigate(['']);
  }
}

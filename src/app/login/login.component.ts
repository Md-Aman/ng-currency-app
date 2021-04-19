import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, Select } from '@ngxs/store';

import { LOG_IN_USER } from 'src/app/store/user/user.action';
import { UserState } from '../store/user/user.state';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Select(UserState.isLoggedIn) isLoggedIn$;
  @Output() showSignUpPage = new EventEmitter();
  @Output() closeDialog = new EventEmitter();

  submitted = false;
  loginForm: FormGroup;

  constructor(
    private store: Store,
    private router: Router,
    private formBuilder: FormBuilder) { }

  get f() { return this.loginForm.controls; }

  ngOnInit(): void {
    this.inItForm();
  }


  inItForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  logIn(data) {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.store.dispatch(new LOG_IN_USER(data)).subscribe(state => {
        const isLoggedIn = this.store.selectSnapshot(UserState.isLoggedIn);
        if (isLoggedIn) {
          this.router.navigate(['']);
        }
      });
    }
  }




}

import { Component, OnInit } from '@angular/core';
import * as reducers from '../../reducers/reducers'
import * as fromAuthActions from '../../actions/auth.actions'
import { Store } from '@ngrx/store';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  loginProcess: boolean;
  error$ = this.store.select(reducers.getAuthError);
  isLoading$ = this.store.select(reducers.getAuthLoading);

  constructor(private store: Store<reducers.State>, public formBuilder: FormBuilder) {
    this.loginForm = formBuilder.group({
      username: ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      password: ['', Validators.compose([Validators.maxLength(50), Validators.required])]
    })
  }

  async ngOnInit() { }


  login(ev) {
    ev.preventDefault();
    this.store.dispatch(new fromAuthActions.LoginUser(this.loginForm.value))
  }

}
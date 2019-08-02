import { Component, OnInit } from '@angular/core';
import * as reducers from '../../reducers/reducers'
import * as fromAuthActions from '../../actions/auth.actions'
import { Store } from '@ngrx/store';
import { OpenAlert } from '../../actions/alert.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: any;
  loginProcess: boolean;
  error$ = this.store.select(reducers.getAuthError);
  isLoading$ = this.store.select(reducers.getAuthLoading);

  constructor(private store: Store<reducers.State>) {
  }

  async ngOnInit() {
    this.user = {
      username: 'jorgeucano',
      email: 'jorgeuc@no.com',
      password: 'jorgeucano'
    }

  }


  login(ev) {
    ev.preventDefault();
    this.store.dispatch(new fromAuthActions.LoginUser({ user: this.user }))
  }

  openAlert() {

  }

}

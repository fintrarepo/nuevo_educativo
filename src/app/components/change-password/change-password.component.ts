import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as reducers from '../../reducers/reducers';
import { getIsOpenChangePassword } from '../../reducers/auth.reducer';
import { ChangePassword } from '../../actions/auth.actions';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  password: String = '';
  password_validation: String = '';
  blurPassword: boolean = false;
  
  isOpenPassword$ = this.store.select(reducers.getAuthIsOpenChangePassword)

  constructor(private store: Store<reducers.State>) { }

  ngOnInit() {
  }

  changePassword() {
    const action = new ChangePassword({ password1: this.password, password2: this.password_validation })
    this.store.dispatch(action)
  }

  validatePasswords() {
    return !(this.password == this.password_validation && this.password.length > 5 && this.password_validation.length > 5);
  }

}

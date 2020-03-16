import { Component, OnInit } from '@angular/core';
import * as reducers from '../../reducers/reducers'
import * as fromAuthActions from '../../actions/auth.actions'
import { Store } from '@ngrx/store';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { OpenRecoveryPassword } from 'src/app/actions/recovery-password.actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  userName: String;
  saggicId: String;

  loginProcess: boolean;
  error$ = this.store.select(reducers.getAuthError);
  isLoading$ = this.store.select(reducers.getAuthLoading);
  blurPage$ = this.store.select(reducers.platformIsBlur);

  constructor(
    private store: Store<reducers.State>,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder) {

    this.loginForm = formBuilder.group({
      username: ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      password: ['', Validators.compose([Validators.maxLength(50), Validators.required])]
    })

    this.userName = this.route.snapshot.paramMap.get('user')
    this.saggicId = this.route.snapshot.paramMap.get('saggicUser')

  }

  async ngOnInit() {
    if (this.userName && this.saggicId) {
      this.loginForm.controls.username.setValue(this.userName)
      document.getElementById('password').focus()
    }
    this.store.select(reducers.getRecoveryState).subscribe(isBlur => {
      console.log(isBlur)
    })
  }


  login(ev) {
    ev.preventDefault();
    let data = { ...this.loginForm.value }
    if (this.saggicId) {
      data['saggic_id'] = this.saggicId
    }
    this.store.dispatch(new fromAuthActions.LoginUser(data))
  }


  openRecovery() {
    this.store.dispatch(new OpenRecoveryPassword())
  }

}

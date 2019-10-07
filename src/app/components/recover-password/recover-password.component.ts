import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as reducers from '../../reducers/reducers';
import { SendIdUser, SendRecoveryMethod , CancelRecovery} from 'src/app/actions/recovery-password.actions';
import { filter } from 'rxjs/operators';
import { RecoveryChangePassword , } from '../../actions/recovery-password.actions';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {

  identificacion = "";
  methodSelected;
  method;
  code;
  password;
  password_validation;

  isOpen$ = this.store.select(reducers.getRecoveryIsOpen)
  currentStep$ = this.store.select(reducers.getRecoveryCurrentStep)
  methods$ = this.store.select(reducers.getRecoveryMethods)

  constructor(private store: Store<reducers.State>) { }

  ngOnInit() {
    this.methods$.subscribe(data => {
      console.log(data)
    })
  }

  recoveryPassword() {
    const action = new SendIdUser({ identificacion: this.identificacion.toString() })
    this.store.dispatch(action)
  }

  sendMethodSelected() {
    const action = new SendRecoveryMethod(this.methodSelected)
    this.store.dispatch(action)
  }

  changePassword() {
    const action = new RecoveryChangePassword({
      password1: this.password,
      password2: this.password_validation,
      codigo: this.code,
      identificacion: this.identificacion
    })
    this.store.dispatch(action)
  }

  cancel(){
    const action = new CancelRecovery()
    this.store.dispatch(action)
  }


  setMethodSelected(item) {
    this.methodSelected = item;
  }


}

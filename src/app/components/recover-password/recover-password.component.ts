import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as reducers from '../../reducers/reducers';
import { SendIdUser, SendRecoveryMethod } from 'src/app/actions/recovery-password.actions';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {

  identificacion = "1143444600";
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

  setMethodSelected(item) {
    this.methodSelected = item;
  }



}

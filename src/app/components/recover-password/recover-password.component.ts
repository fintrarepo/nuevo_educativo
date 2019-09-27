import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as reducers from '../../reducers/reducers';
import { SendIdUser, SendRecoveryMethod } from 'src/app/actions/recovery-password.actions';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {

  identificacion = "1007116509";
  methodSelected;

  isOpen$ = this.store.select(reducers.getRecoveryIsOpen)
  currentStep$ = this.store.select(reducers.getRecoveryCurrentStep)
  methods$ = this.store.select(reducers.getRecoveryMethods)
  
  constructor(private store: Store<reducers.State>) { }

  ngOnInit() {

  }

  recoveryPassword() {
    const action = new SendIdUser({ identificacion: this.identificacion.toString() })
    this.store.dispatch(action)
  }

  setMethodSelected() {
    const action = new SendRecoveryMethod({
      recoveryMethod: this.methodSelected,
      identificacion: this.identificacion
    })
    this.store.dispatch(action)
  }

}

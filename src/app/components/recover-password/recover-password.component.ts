import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as reducers from '../../reducers/reducers';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {

  // isOpen$ = this.store.select(reducers.recoveryIsOpen);

  constructor(private store: Store<reducers.State>) { }

  ngOnInit() {
    this.store.select(reducers.getRecoveryIsOpen).subscribe( isOpen =>{
      console.log('HOLA')
      console.log(isOpen)
    })
  }

}

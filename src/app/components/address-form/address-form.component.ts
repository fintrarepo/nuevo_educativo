import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as reducers from '../../reducers/reducers';
import { ClosedForm } from 'src/app/actions/address-form.actions';
import { FormBuilder, Validators, FormGroup } from '@angular/forms'
import { ConfirmAddress } from '../../actions/address-form.actions';
@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {

  isVisible$ = this.store.select(reducers.addressFormIsVisile);
  addressForm: FormGroup;

  constructor(private store: Store<reducers.State>, public formBuilder: FormBuilder) {
    this.addressForm = formBuilder.group({
      departamento: ['', Validators.compose([Validators.maxLength(60), Validators.required])],
      ciudad: ['', Validators.compose([Validators.maxLength(60), Validators.required])],
      tipo_via: ['', Validators.compose([Validators.maxLength(60), Validators.required])],
      via_principal: ['', Validators.compose([Validators.maxLength(60), Validators.required])],
      numero_1: ['', Validators.compose([Validators.maxLength(60), Validators.required])],
      numero_2: ['', Validators.compose([Validators.maxLength(60), Validators.required])],
      complementoDireccion: ['', Validators.compose([Validators.maxLength(160)])]
    })
  }

  ngOnInit() {
    this.isVisible$.subscribe(visible => {
      if (!visible)
        this.addressForm.reset()
    })
  }

  closeAlert() {
    this.store.dispatch(new ClosedForm())
  }

  confirmAddress() {
    console.log(this.addressForm.value)
    this.store.dispatch(
      new ConfirmAddress({
        ...this.addressForm.value,
        visible: false
      })
    )
    //this.addressForm.reset();
  }

}

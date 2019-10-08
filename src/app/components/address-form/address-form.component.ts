import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as reducers from '../../reducers/reducers';
import { ClosedForm } from 'src/app/actions/address-form.actions';
import { FormBuilder, Validators, FormGroup } from '@angular/forms'
import { ConfirmAddress } from '../../actions/address-form.actions';
import { LoadCitys } from '../../actions/platform.actions';
@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {


  addressForm: FormGroup;
  ciudades: any[] = []

  isVisible$ = this.store.select(reducers.addressFormIsVisile);
  formData$ = this.store.select(reducers.platformDataForm);
  citys$ = this.store.select(reducers.citys);

  constructor(private store: Store<reducers.State>, public formBuilder: FormBuilder) {
    this.addressForm = formBuilder.group({
      departamento: ['', Validators.compose([Validators.maxLength(60), Validators.required])],
      ciudad: ['', Validators.compose([Validators.maxLength(60), Validators.required])],
      tipo_via: ['', Validators.compose([Validators.maxLength(60), Validators.required])],
      via_principal: ['', Validators.compose([Validators.maxLength(60), Validators.required])],
      via_secundaria: ['', Validators.compose([Validators.maxLength(60), Validators.required])],
      numero: ['', Validators.compose([Validators.maxLength(60), Validators.required])],
      complementoDireccion: ['', Validators.compose([Validators.maxLength(160)])]
    })

    this.citys$.subscribe(this.citysLoaded.bind(this))
  }


  ngOnInit() {
    this.isVisible$.subscribe(visible => {
      if (!visible) {
        this.addressForm.reset();

      } else {
        this.ciudades = [];
      }
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

  loadCitys(dpto) {
    const action = new LoadCitys({ dpto })
    this.store.dispatch(action)
  }


  citysLoaded(citys) {
    this.ciudades = citys;
  }

}

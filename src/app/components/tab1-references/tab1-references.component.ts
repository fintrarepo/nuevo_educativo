import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as reducers from '../../reducers/reducers';
import { OpenForm, ClosedForm } from '../../actions/address-form.actions';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tab1-references',
  templateUrl: './tab1-references.component.html',
  styleUrls: ['./tab1-references.component.scss']
})
export class Tab1ReferencesComponent implements OnInit {
  form: FormGroup;
  tab1;
  constructor(private store: Store<reducers.State>, public formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      "primer_apellido_f": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "segundo_apellido_f": ['', Validators.compose([Validators.maxLength(50)])],
      "primer_nombre_f": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "segundo_nombre_f": ['', Validators.compose([Validators.maxLength(50)])],
      "parentesco_f": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "direccion_f": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "telefono1_f": ['', Validators.compose([Validators.maxLength(10), Validators.pattern('^[0-9]*$')])],
      "celular_f": ['', Validators.compose([Validators.maxLength(10), Validators.required, Validators.pattern('^[0-9]*$')])],
      "primer_apellido_p": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "segundo_apellido_p": ['', Validators.compose([Validators.maxLength(50)])],
      "primer_nombre_p": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "segundo_nombre_p": ['', Validators.compose([Validators.maxLength(50)])],
      "direccion_p": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "telefono1_p": ['', Validators.compose([Validators.maxLength(10), Validators.pattern('^[0-9]*$')])],
      "celular_p": ['', Validators.compose([Validators.maxLength(10), Validators.required, Validators.pattern('^[0-9]*$')])]
    });
   }

  ngOnInit() {
  }

  openForm() {
    // this.store.dispatch(new OpenForm());
  }

  closeForm() {
    this.store.dispatch(new ClosedForm());
  }

  impForm() {
    console.log(JSON.stringify(this.form.value));
  }
}

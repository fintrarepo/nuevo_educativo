import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as reducers from '../../reducers/reducers';
import { OpenForm, ClosedForm } from '../../actions/address-form.actions';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tab1-working-information',
  templateUrl: './tab1-working-information.component.html',
  styleUrls: ['./tab1-working-information.component.scss']
})
export class Tab1WorkingInformationComponent implements OnInit {
form: FormGroup;
tab1;
  constructor(private store: Store<reducers.State>, public formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      "actividad_economica": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "ocupacion": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "nombre_empresa": ['', Validators.compose([Validators.maxLength(50) ])],
      "nit": ['', Validators.compose([Validators.maxLength(10) ])],
      "cargo": ['', Validators.compose([Validators.maxLength(50)])],
      "tipo_contrato": ['', Validators.compose([Validators.maxLength(50)])],
      "fecha_ingreso": ['', Validators.compose([Validators.maxLength(50)])],
      "direccion": ['', Validators.compose([Validators.maxLength(50)])],
      "telefono": ['', Validators.compose([Validators.maxLength(10), Validators.pattern('^[0-9]*$')])],
      "email": ['', Validators.compose([Validators.maxLength(50), Validators.email])],
      "salario_ing": ['', Validators.compose([Validators.maxLength(8), Validators.required, Validators.pattern('^[0-9]*$')])],
      "comisiones_ing": ['', Validators.compose([Validators.maxLength(8), Validators.pattern('^[0-9]*$')])],
      "honorarios_ing": ['', Validators.compose([Validators.maxLength(8), Validators.pattern('^[0-9]*$')])],
      "arrendamientos_ing": ['', Validators.compose([Validators.maxLength(8), Validators.pattern('^[0-9]*$')])],
      "otros_ingresos": ['', Validators.compose([Validators.maxLength(8), Validators.pattern('^[0-9]*$')])],
      "total_activos": ['', Validators.compose([Validators.maxLength(8), Validators.pattern('^[0-9]*$')])],
      "arriendo_egr": ['', Validators.compose([Validators.maxLength(8), Validators.pattern('^[0-9]*$')])],
      "prestamo_xnomina": ['', Validators.compose([Validators.maxLength(8), Validators.pattern('^[0-9]*$')])],
      "total_pasivos": ['', Validators.compose([Validators.maxLength(8), Validators.pattern('^[0-9]*$')])]
    });
   }

  ngOnInit() {
  }

  openForm() {
    this.store.dispatch(new OpenForm());
  }

  closeForm() {
    this.store.dispatch(new ClosedForm());
  }

  saveData() {
    console.log(JSON.stringify(this.form.value));
  }

}

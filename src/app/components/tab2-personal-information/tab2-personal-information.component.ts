import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as reducers from '../../reducers/reducers';
import { OpenForm, ClosedForm } from '../../actions/address-form.actions';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tab2-personal-information',
  templateUrl: './tab2-personal-information.component.html',
  styleUrls: ['./tab2-personal-information.component.scss']
})
export class Tab2PersonalInformationComponent implements OnInit {
  form: FormGroup;
  tab2;
  constructor(private store: Store<reducers.State>, public formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      "primer_nombre": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "segundo_nombre": ['', Validators.compose([Validators.maxLength(50)])],
      "primer_apellido": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "segundo_apellido": ['', Validators.compose([Validators.maxLength(50)])],
      "genero": ['', Validators.compose([Validators.maxLength(1), Validators.required])],
      "estado_civil": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "tipo_id": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "identificacion": ['', Validators.compose([Validators.maxLength(50), Validators.required, Validators.pattern('^[0-9]*$')])],
      "fecha_expedicion_id": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "dpto_expedicion_id": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "ciudad_expedicion_id": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "fecha_nacimiento": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "dpto_nacimiento": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "ciudad_nacimiento": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "telefono": ['', Validators.compose([Validators.maxLength(10), Validators.pattern('^[0-9]*$')])],
      "email": ['', Validators.compose([Validators.maxLength(50), Validators.required, Validators.email])],
      "celular": ['', Validators.compose([Validators.maxLength(10), Validators.required, Validators.pattern('^[0-9]*$')])],
      "direccion": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "barrio": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "tipo_vivienda": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "estrato": ['', Validators.compose([Validators.maxLength(1), Validators.required, Validators.pattern('^[0-9]*$')])],
      "posee_bienes": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "nivel_estudio": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "estado_civil_padres": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "tiempo_residencia": ['', Validators.compose([Validators.maxLength(50)])]
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

  impForm() {
    console.log(JSON.stringify(this.form.value));
  }

}

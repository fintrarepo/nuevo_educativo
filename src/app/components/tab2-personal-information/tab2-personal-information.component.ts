import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as reducers from '../../reducers/reducers';
import { OpenForm, ClosedForm } from '../../actions/address-form.actions';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UtilsService } from '../../services/utils/utils.service';

@Component({
  selector: 'app-tab2-personal-information',
  templateUrl: './tab2-personal-information.component.html',
  styleUrls: ['./tab2-personal-information.component.scss']
})
export class Tab2PersonalInformationComponent implements OnInit {
  form: FormGroup;
  tab2;
  constructor(private store: Store<reducers.State>, public formBuilder: FormBuilder, private utils: UtilsService) {
    this.form = formBuilder.group({
      "tipo_id": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "identificacion": ['', Validators.compose([Validators.maxLength(50), Validators.required, Validators.pattern('^[0-9]*$')])],
      "fecha_expedicion_id": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "primer_apellido": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "segundo_apellido": ['', Validators.compose([Validators.maxLength(50)])],
      "primer_nombre": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "segundo_nombre": ['', Validators.compose([Validators.maxLength(50)])],
      "genero": ['', Validators.compose([Validators.maxLength(1), Validators.required])],
      "estado_civil": ['', Validators.compose([Validators.maxLength(1), Validators.required])],
      "dpto_expedicion_id": ['', Validators.compose([Validators.maxLength(6), Validators.required])],
      "ciudad_expedicion_id": ['', Validators.compose([Validators.maxLength(6), Validators.required])],
      "fecha_nacimiento": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "dpto_nacimiento": ['', Validators.compose([Validators.maxLength(6), Validators.required])],
      "ciudad_nacimiento": ['', Validators.compose([Validators.maxLength(6), Validators.required])],
      "telefono": ['', Validators.compose([Validators.maxLength(15), Validators.required, Validators.pattern('^[0-9]*$')])],
      "email": ['', Validators.compose([Validators.maxLength(100), Validators.required, Validators.email])],
      "celular": ['', Validators.compose([Validators.maxLength(15), Validators.required, Validators.pattern('^[0-9]*$')])],
      "direccion": ['', Validators.compose([Validators.maxLength(160), Validators.required])],
      "barrio": ['', Validators.compose([Validators.maxLength(100), Validators.required])],
      "tipo_vivienda": ['', Validators.compose([Validators.maxLength(30), Validators.required])],
      "tiempo_residencia": ['', Validators.compose([Validators.maxLength(20)])],
      "estrato": ['', Validators.compose([Validators.maxLength(1), Validators.required, Validators.pattern('^[0-9]*$')])],
      "sisben": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "nivel_estudio": ['', Validators.compose([Validators.maxLength(15), Validators.required])],
      "colegio_bachillerato": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "trabaja": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "tipo_carrera": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "programa": ['', Validators.compose([Validators.maxLength(100), Validators.required])],
      "codigo": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "semestre": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "parentesco_girador": ['', Validators.compose([Validators.maxLength(20), Validators.required])]
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

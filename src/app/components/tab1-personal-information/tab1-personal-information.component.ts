import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as reducers from '../../reducers/reducers';
import { OpenForm, ClosedForm } from '../../actions/address-form.actions';
import { FormBuilder, Validators, FormGroup } from '@angular/forms'
import { ITab1 } from '../../models/tabs.model'
@Component({
  selector: 'app-tab1-personal-information',
  templateUrl: './tab1-personal-information.component.html',
  styleUrls: ['./tab1-personal-information.component.scss']
})
export class Tab1PersonalInformationComponent implements OnInit {
  form: FormGroup;
  tab1;
  constructor(private store: Store<reducers.State>, public formBuilder: FormBuilder) {
    //ESTO NO ESSSS
    this.form = formBuilder.group({
      "entidad":  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "afiliado":  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "monto":  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "producto":  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "num_cuotas":  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "fecha_pago":  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "id_convenio":  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "fecha_credito":  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "tipo_identificacion":  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "identificacion":  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "fecha_expedicion":  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "primer_nombre":  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "primer_apellido":  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "email":  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "ingresos_usuario":  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "fecha_nacimiento":  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "valor_cuota":  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "valor_aval":  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "empresa":  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "telefono":  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "tipo_cliente":  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "financia_aval":  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      // "login":  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      // "asesor":  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "und_neg":  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "departamento":  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "ciudad":  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "nit_empresa":  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "monto_renovacion":  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "politica":  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "negocio_origen":  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
    })
  }

  ngOnInit() {
  }


  openForm() {
    this.store.dispatch(new OpenForm())
  }

  closeForm() {
    this.store.dispatch(new ClosedForm())
  }
}





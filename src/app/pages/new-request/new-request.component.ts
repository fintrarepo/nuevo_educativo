import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms'
import { OpenAlert } from 'src/app/actions/alert.actions';
import { Store } from '@ngrx/store';
import * as reducers from '../../reducers/reducers';
import { UtilsService } from '../../services/utils/utils.service'
@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.scss']
})
export class NewRequestComponent implements OnInit {

  form: FormGroup;
  dates: any[] = [];
  cities: any[] = [];
  afiliates: any[] = [];
  
  constructor(public formBuilder: FormBuilder,
    private store: Store<reducers.State>,
    private utils: UtilsService) {

    this.form = formBuilder.group({
      "tipo_carrera": ['PREGRADO', Validators.compose([Validators.maxLength(50), Validators.required])],
      "entidad": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "afiliado": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "monto": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "producto": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "num_cuotas": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "fecha_pago": ['2018-08-12', Validators.compose([Validators.maxLength(50), Validators.required])],
      "id_convenio": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "fecha_credito": ['12', Validators.compose([Validators.maxLength(50), Validators.required])],
      "tipo_identificacion": ['CC', Validators.compose([Validators.maxLength(50), Validators.required])],
      "identificacion": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "fecha_expedicion": ['2017-03-06', Validators.compose([Validators.maxLength(50), Validators.required])],
      "primer_nombre": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "primer_apellido": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "email": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "ingresos_usuario": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "fecha_nacimiento": ['1999-03-05', Validators.compose([Validators.maxLength(50), Validators.required])],
      "valor_cuota": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "valor_aval": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "empresa": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "telefono": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "tipo_cliente": [''],
      "financia_aval": ['f', Validators.compose([Validators.maxLength(50), Validators.required])],
      "login": ['APICREDIT', Validators.compose([Validators.maxLength(50), Validators.required])],
      // "asesor":  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "und_neg": ['31', Validators.compose([Validators.maxLength(50), Validators.required])],
      // "departamento": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "ciudad": ['BAQ', Validators.compose([Validators.maxLength(50), Validators.required])],
      "nit_empresa": ['8020220161', Validators.compose([Validators.maxLength(50), Validators.required])],
      "monto_renovacion": [],
      "politica": [],
      "negocio_origen": [],
    })
  }

  ngOnInit() {
    this.dates = this.utils.carcularFecha()
    this.utils.loadCitys().subscribe(cities => {
      this.cities = cities;
    })
  }


  simulate() {
    if (!this.form.valid) {
      const action = new OpenAlert({
        open: true,
        title: "Error",
        subTitle: "Verifique los campos",
        type: "warning"
      });
      return this.store.dispatch(action)

    }

    console.log(this.form.value)
  }


  loadAfiliates() {
    this.utils
      .loadAfiliates(this.form.controls.ciudad.value)
      .subscribe(afiliates => {
        this.afiliates = afiliates.data;
      })
  }


}

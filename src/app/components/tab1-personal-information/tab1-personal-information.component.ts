import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as reducers from '../../reducers/reducers';
import { OpenForm, ClosedForm } from '../../actions/address-form.actions';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ITab1SubTab1 } from '../../models/tabs.model';
import { SendTab1SubTab1 } from '../../actions/tab1SubTab1.actions';
import { ActivatedRoute } from "@angular/router";
import { UtilsService } from '../../services/utils/utils.service'
@Component({
  selector: 'app-tab1-personal-information',
  templateUrl: './tab1-personal-information.component.html',
  styleUrls: ['./tab1-personal-information.component.scss']
})
export class Tab1PersonalInformationComponent implements OnInit {
  form: FormGroup;
  tab1;
  business;
  addressObject;

  addressState$ = this.store.select(reducers.getAddressFormState);
  formData$ = this.store.select(reducers.platformDataForm);

  constructor(private store: Store<reducers.State>,
    private utils: UtilsService,
    public formBuilder: FormBuilder,
    private route: ActivatedRoute) {
    this.business = this.route.snapshot.paramMap.get("id")
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
      "estrato": [null, Validators.compose([Validators.maxLength(1), Validators.required, Validators.pattern('^[0-9]*$')])],
      "posee_bienes": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "nivel_estudio": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "estado_civil_padres": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "tiempo_residencia": ['', Validators.compose([Validators.maxLength(50)])]
    });

    this.addressState$.subscribe(data => {
      this.addressObject = data;
    })


  }

  ngOnInit() {
  }


  openForm() {
    this.store.dispatch(new OpenForm());
  }

  closeForm() {
    this.store.dispatch(new ClosedForm());
  }

  save() {
    const data = this.buildDataForm()
    const action = new SendTab1SubTab1({
      tab: 1,
      final: false,
      numero_solicitud: this.business,
      tabs_info: {
        ...data
      }
    })
    this.store.dispatch(action)
  }


  private buildDataForm() {
    let dataForm = { ...this.form.value, "ciudad": "Barranquila", "departamento": "Atlantico", "numero": "45", "tipo_via": "calle", "via_principal": "Carrera", "via_secundaria": "45" }
    dataForm.fecha_expedicion_id = this.utils.buildDate(dataForm.fecha_expedicion_id)
    dataForm.fecha_nacimiento = this.utils.buildDate(dataForm.fecha_nacimiento)
    dataForm.estrato = parseInt(dataForm.estrato)
    return dataForm;
  }
}





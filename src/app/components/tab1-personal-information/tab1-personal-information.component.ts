import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as reducers from '../../reducers/reducers';
import { OpenForm, ClosedForm } from '../../actions/address-form.actions';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ITab1SubTab1 } from '../../models/tabs.model';
import { SendTab1SubTab1 } from '../../actions/tab1SubTab1.actions';
import { ActivatedRoute } from "@angular/router";
import { UtilsService } from '../../services/utils/utils.service'
import { LoadCitys } from '../../actions/platform.actions';
import { shareReplay } from 'rxjs/operators';

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
  currentSelectDpto;
  observerAddress;
  observerCity;

  //CITYS
  ciudad_expedicion_id: any[] = [];
  ciudad_nacimiento: any[] = [];
  neighborhoods: any[] = [];

  addressState$ = this.store.select(reducers.getAddressFormState);
  formData$ = this.store.select(reducers.platformDataForm);
  citys$ = this.store.select(reducers.citys);


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
      "tiempo_residencia": ['', Validators.compose([Validators.maxLength(50)])],
      departamento: ['', Validators.compose([Validators.maxLength(60), Validators.required])],
      ciudad: ['', Validators.compose([Validators.maxLength(60), Validators.required])],
      tipo_via: ['', Validators.compose([Validators.maxLength(60), Validators.required])],
      via_principal: ['', Validators.compose([Validators.maxLength(60), Validators.required])],
      via_secundaria: ['', Validators.compose([Validators.maxLength(60), Validators.required])],
      numero: ['', Validators.compose([Validators.maxLength(60), Validators.required])],
      complemento: ['', Validators.compose([Validators.maxLength(160)])]

    });


  }

  ngOnInit() {
    this.observerAddress = this.addressState$.pipe(shareReplay()).subscribe(this.addressLoaded.bind(this))

    this.observerCity = this.citys$.subscribe(this.citysLoaded.bind(this))
  }


  openForm(field) {
    this.store.dispatch(new OpenForm({
      fieldDestinity: "tab1SubTab1" + field
    }));
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

  loadCitys(dpto, control) {
    this.currentSelectDpto = control;
    const action = new LoadCitys({ dpto })
    this.store.dispatch(action)
  }

  citysLoaded(citys) {
    this[this.currentSelectDpto] = citys;
  }

  addressLoaded(address) {
    let newAddress = { test: '', ...address }
    console.log(newAddress)
    if (newAddress.fieldDestinity == "tab1SubTab1direccion") {
      if (newAddress.departamento == '') return;
      for (let i in newAddress) {
        if (this.form.controls[i])
          this.form.controls[i].setValue(newAddress[i])
      }
      let complemento = newAddress.complemento ? newAddress.complemento : ''
      this.form.controls.direccion.setValue(newAddress.tipo_via + " " + newAddress.via_principal + " #" + newAddress.via_secundaria + " - " + newAddress.numero + " " + complemento)
      this.form.updateValueAndValidity();

      this.loadNeighborhood(newAddress.ciudad)
    }
  }

  loadNeighborhood(city) {
    this.utils.getNeighborhood(city).subscribe(response => {
      this.neighborhoods = response.data;
    })
  }

  ngOnDestroy() {
    this.observerCity.unsubscribe()
    this.observerAddress.unsubscribe()
  }

  private buildDataForm() {
    let dataForm = { ...this.form.value }
    dataForm.fecha_expedicion_id = this.utils.buildDate(dataForm.fecha_expedicion_id)
    dataForm.fecha_nacimiento = this.utils.buildDate(dataForm.fecha_nacimiento)
    dataForm.estrato = parseInt(dataForm.estrato)
    return dataForm;
  }

}





import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as reducers from '../../reducers/reducers';
import { OpenForm, ClosedForm } from '../../actions/address-form.actions';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { SendTab1SubTab3 } from '../../actions/tab1SubTab3.actions';
import { ActivatedRoute } from "@angular/router";
import { CreditsService } from '../../services/credits/credits.service';
import { SelecteTab1SubTab2 } from '../../actions/tabs.actions';
import { OpenAlert } from '../../actions/alert.actions';
@Component({
  selector: 'app-tab1-references',
  templateUrl: './tab1-references.component.html',
  styleUrls: ['./tab1-references.component.scss']
})
export class Tab1ReferencesComponent implements OnInit {
  form: FormGroup;
  tab1;
  business;

  addressState$ = this.store.select(reducers.getAddressFormState);
  formData$ = this.store.select(reducers.platformDataForm);

  constructor(private credits: CreditsService,
    private store: Store<reducers.State>,
    public formBuilder: FormBuilder,
    private route: ActivatedRoute) {

    this.business = this.route.snapshot.paramMap.get("id")
    this.form = formBuilder.group({
      "primer_apellido_f": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "segundo_apellido_f": ['', Validators.compose([Validators.maxLength(50)])],
      "primer_nombre_f": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "segundo_nombre_f": ['', Validators.compose([Validators.maxLength(50)])],
      "parentesco_f": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      // "direccion_f": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "telefono1_f": ['', Validators.compose([Validators.maxLength(10), Validators.pattern('^[0-9]*$')])],
      "celular_f": ['', Validators.compose([Validators.maxLength(10), Validators.required, Validators.pattern('^[0-9]*$')])],
      "primer_apellido_p": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "segundo_apellido_p": ['', Validators.compose([Validators.maxLength(50)])],
      "primer_nombre_p": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "segundo_nombre_p": ['', Validators.compose([Validators.maxLength(50)])],
      // "direccion_p": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "telefono1_p": ['', Validators.compose([Validators.maxLength(10), Validators.pattern('^[0-9]*$')])],
      "celular_p": ['', Validators.compose([Validators.maxLength(10), Validators.required, Validators.pattern('^[0-9]*$')])],

      // departamento_p: ['', Validators.compose([Validators.maxLength(60), Validators.required])],
      // ciudad_p: ['', Validators.compose([Validators.maxLength(60), Validators.required])],
      // tipo_via_p: ['', Validators.compose([Validators.maxLength(60), Validators.required])],
      // via_principal_p: ['', Validators.compose([Validators.maxLength(60), Validators.required])],
      // via_secundaria_p: ['', Validators.compose([Validators.maxLength(60), Validators.required])],
      // numero_p: ['', Validators.compose([Validators.maxLength(60), Validators.required])],
      // complemento_p: ['', Validators.compose([Validators.maxLength(160)])],

      // departamento_f: ['', Validators.compose([Validators.maxLength(60), Validators.required])],
      // ciudad_f: ['', Validators.compose([Validators.maxLength(60), Validators.required])],
      // tipo_via_f: ['', Validators.compose([Validators.maxLength(60), Validators.required])],
      // via_principal_f: ['', Validators.compose([Validators.maxLength(60), Validators.required])],
      // via_secundaria_f: ['', Validators.compose([Validators.maxLength(60), Validators.required])],
      // numero_f: ['', Validators.compose([Validators.maxLength(60), Validators.required])],
      // complemento_f: ['', Validators.compose([Validators.maxLength(160)])]
    });
    this.addressState$.subscribe(this.addressLoaded.bind(this))
  }

  ngOnInit() {
    this.credits.autoComplete({
      "numero_solicitud": this.business, "tab": 3
    }).subscribe(this.responseAutoComplete.bind(this))
  }



  openForm(field) {
    const type = field == 'direccion_f' ? '_f' : '_p';

    const address = {
      departamento: this.form.controls['departamento' + type].value,
      ciudad: this.form.controls['ciudad' + type].value,
      complemento: this.form.controls['complemento' + type].value,
      via_principal: this.form.controls['via_principal' + type].value,
      via_secundaria: this.form.controls['via_secundaria' + type].value,
      tipo_via: this.form.controls['tipo_via' + type].value,
      visible: true,
      numero: this.form.controls['numero' + type].value,
    }
    this.store.dispatch(new OpenForm({
      fieldDestinity: "tab1SubTab3" + field,
      ...address
    }));
  }

  closeForm() {
    this.store.dispatch(new ClosedForm());
  }

  save() {
    this.form.markAllAsTouched()
    if (!this.form.valid) {
      return this.store.dispatch(new OpenAlert({
        open: true,
        title: "Error",
        subTitle: "Por favor verifica los campos e inténtalo nuevamente.",
        type: "danger"
      }))
    }
    const data = this.buildDataForm()
    const action = new SendTab1SubTab3({
      tab: 3,
      final: false,
      numero_solicitud: this.business,
      tabs_info: [
        {
          tipo_referencia: "F",
          "secuencia": 1,
          ...this.buildType('f')
        },
        {
          tipo_referencia: "P",
          "secuencia": 2,
          ...this.buildType('p')
        }
      ]
    })
    this.store.dispatch(action)
  }

  back() {
    this.store.dispatch(new SelecteTab1SubTab2())
  }

  addressLoaded(address) {
    console.log(address)
    let newAddress = { ...address }
    if (newAddress.fieldDestinity == "tab1SubTab3direccion_p" || newAddress.fieldDestinity == "tab1SubTab3direccion_f") {
      let tipoReference = newAddress.fieldDestinity == "tab1SubTab3direccion_p" ? '_p' : '_f';

      for (let i in newAddress) {
        if (this.form.controls[i + tipoReference])
          this.form.controls[i + tipoReference].setValue(newAddress[i])
      }
      let complemento = newAddress.complemento ? newAddress.complemento : ''
      this.form.controls['direccion' + tipoReference].setValue(newAddress.tipo_via + " " + newAddress.via_principal + " #" + newAddress.via_secundaria + " - " + newAddress.numero + " " + complemento)
      this.form.updateValueAndValidity();
    }
  }


  
  validator(control) {
    const validator = this.form.get(control).validator({} as AbstractControl);
    if (validator && validator.required) {
      return true;
    }
  }



  private buildDataForm() {
    let dataForm = { ...this.form.value }
    return dataForm;
  }

  private buildType(type) {

    return {
      primer_apellido: this.form.controls['primer_apellido_' + type].value,
      primer_nombre: this.form.controls['primer_nombre_' + type].value,
      segundo_apellido: this.form.controls['segundo_apellido_' + type].value,
      segundo_nombre: this.form.controls['segundo_nombre_' + type].value,
      parentesco: this.form.controls['parentesco_' + type] ? this.form.controls['parentesco_' + type].value : '',
      telefono1: parseInt(this.form.controls['telefono1_' + type].value),
      // direccion: this.form.controls['direccion_' + type].value,
      celular: parseInt(this.form.controls['celular_' + type].value),
      // departamento: this.form.controls['departamento_' + type].value,
      // ciudad: this.form.controls['ciudad_' + type].value,
      // tipo_via: this.form.controls['tipo_via_' + type].value,
      // via_principal: this.form.controls['via_principal_' + type].value,
      // via_secundaria: this.form.controls['via_secundaria_' + type].value,
      // numero: this.form.controls['numero_' + type].value,
      // complemento: this.form.controls['complemento_' + type].value,
    }
  }

  responseAutoComplete(response) {
    const personal = response.data.filter(x => x.tipo_referencia == 'P')[0]
    const familiar = response.data.filter(x => x.tipo_referencia == 'F')[0]
    console.log(personal)
    for (let i in personal) {
      if (this.form.controls[i + "_p"]) {
        this.form.controls[i + "_p"].setValue(personal[i])
      }
    }

    for (let i in familiar) {
      if (this.form.controls[i + "_f"]) {
        this.form.controls[i + "_f"].setValue(familiar[i])
      }
    }
  }

}


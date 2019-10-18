import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as reducers from '../../reducers/reducers';
import { OpenForm, ClosedForm } from '../../actions/address-form.actions';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { SendTab1SubTab2 } from '../../actions/tab1SubTab2.actions';
import { ActivatedRoute } from "@angular/router";
import { UtilsService } from '../../services/utils/utils.service';
import { CreditsService } from '../../services/credits/credits.service';
import { SelecteTab1SubTab1 } from '../../actions/tabs.actions';

@Component({
  selector: 'app-tab1-working-information',
  templateUrl: './tab1-working-information.component.html',
  styleUrls: ['./tab1-working-information.component.scss']
})
export class Tab1WorkingInformationComponent implements OnInit {
  form: FormGroup;
  tab1;
  business;
  jobs: any[] = [];

  formData$ = this.store.select(reducers.platformDataForm);
  addressState$ = this.store.select(reducers.getAddressFormState);

  constructor(private credits: CreditsService, private store: Store<reducers.State>,
    public formBuilder: FormBuilder,
    private utils: UtilsService,
    private route: ActivatedRoute) {
    this.form = formBuilder.group({
      "actividad_economica": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "ocupacion": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "nombre_empresa": ['', Validators.compose([Validators.maxLength(50)])],
      // "nit": ['', Validators.compose([Validators.maxLength(10)])],
      "cargo": ['', Validators.compose([Validators.maxLength(50)])],
      "tipo_contrato": ['', Validators.compose([Validators.maxLength(50)])],
      "fecha_ingreso": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "direccion": ['', Validators.compose([Validators.maxLength(50)])],
      "telefono": ['', Validators.compose([Validators.maxLength(10), Validators.pattern('^[0-9]*$')])],
      // "email": ['', Validators.compose([Validators.maxLength(50), Validators.email])],
      "salario_ing": ['', Validators.compose([Validators.maxLength(8), Validators.required, Validators.pattern('^[0-9]*$')])],
      // "comisiones_ing": ['', Validators.compose([Validators.maxLength(8), Validators.pattern('^[0-9]*$')])],
      // "honorarios_ing": ['', Validators.compose([Validators.maxLength(8), Validators.pattern('^[0-9]*$')])],
      // "arrendamientos_ing": ['', Validators.compose([Validators.maxLength(8), Validators.pattern('^[0-9]*$')])],
      "otros_ingresos": [0, Validators.compose([Validators.maxLength(8), Validators.required, Validators.pattern('^[0-9]*$')])],
      "total_activos": [0, Validators.compose([Validators.maxLength(8), Validators.required, Validators.pattern('^[0-9]*$')])],
      "arriendo_egr": [0, Validators.compose([Validators.maxLength(8), Validators.required, Validators.pattern('^[0-9]*$')])],
      "prestamo_xnomina": [0, Validators.compose([Validators.maxLength(8), Validators.required, Validators.pattern('^[0-9]*$')])],
      "total_pasivos": [0, Validators.compose([Validators.maxLength(8), Validators.required, Validators.pattern('^[0-9]*$')])],
      departamento: ['', Validators.compose([Validators.maxLength(60)])],
      ciudad: ['', Validators.compose([Validators.maxLength(60)])],
      tipo_via: ['', Validators.compose([Validators.maxLength(60)])],
      via_principal: ['', Validators.compose([Validators.maxLength(60)])],
      via_secundaria: ['', Validators.compose([Validators.maxLength(60)])],
      numero: ['', Validators.compose([Validators.maxLength(60)])],
      complemento: ['', Validators.compose([Validators.maxLength(160)])]

    });
    this.business = this.route.snapshot.paramMap.get("id");
    this.addressState$.subscribe(this.addressLoaded.bind(this))

    this.form.controls.actividad_economica.valueChanges.subscribe(this.validateActivity.bind(this))
  }

  ngOnInit() {
    this.credits.autoComplete({
      "numero_solicitud": this.business, "tab": 2
    }).subscribe(this.responseAutoComplete.bind(this))
  }

  validateActivity(activity) {
    if (activity == 'EPLDO') {

      this.form.controls['cargo'].setValidators(Validators.required)
      this.form.controls['tipo_contrato'].setValidators(Validators.required)
      this.form.controls['direccion'].setValidators(Validators.required)
      this.form.controls['telefono'].setValidators(Validators.required)

    } else {
      this.form.controls['cargo'].setValidators(Validators.compose([Validators.maxLength(100)]))
      this.form.controls['tipo_contrato'].setValidators(Validators.compose([Validators.maxLength(100)]))

      this.form.controls['direccion'].setValidators(Validators.compose([Validators.maxLength(100)]))
      this.form.controls['telefono'].setValidators(Validators.compose([Validators.maxLength(100)]))

    }

    this.form.controls['cargo'].updateValueAndValidity()
    this.form.controls['tipo_contrato'].updateValueAndValidity()
    this.form.controls['direccion'].updateValueAndValidity()
    this.form.controls['telefono'].updateValueAndValidity()

  }

  openForm(field) {
    this.store.dispatch(new OpenForm({
      departamento: this.form.controls.departamento.value,
      ciudad: this.form.controls.ciudad.value,
      complemento: this.form.controls.complemento.value,
      via_principal: this.form.controls.via_principal.value,
      via_secundaria: this.form.controls.via_secundaria.value,
      tipo_via: this.form.controls.tipo_via.value,
      visible: true,
      numero: this.form.controls.numero.value,
      fieldDestinity: "tab1SubTab2" + field
    }));
  }

  closeForm() {
    this.store.dispatch(new ClosedForm());
  }

  addressLoaded(address) {
    if (address.fieldDestinity != "tab1SubTab2direccion") return;
    for (let i in address) {
      if (this.form.controls[i])
        this.form.controls[i].setValue(address[i])
    }
    let complemento = address.complemento ? address.complemento : ''
    this.form.controls.direccion.setValue(address.tipo_via + " " + address.via_principal + " #" + address.via_secundaria + " - " + address.numero + " " + complemento)
    this.form.updateValueAndValidity()
  }


  loadJobs(activity) {
    this.utils.loadJobs(activity).subscribe(response => {
      this.jobs = response.data;
    })
  }

  saveData() {
    const data = this.buildDataForm()
    const action = new SendTab1SubTab2({
      tab: 2,
      final: false,
      numero_solicitud: this.business,
      tabs_info: {
        ...data
      }
    })
    this.store.dispatch(action)
  }


  back() {
    this.store.dispatch(new SelecteTab1SubTab1())
  }

  validator(control) {
    const validator = this.form.get(control).validator({} as AbstractControl);
    if (validator && validator.required) {
      return true;
    }
  }


  responseAutoComplete(response) {
    for (let i in response.data) {
      if (this.form.controls[i]) {
        this.form.controls[i].setValue(response.data[i])
      }
    }
    this.form.controls['fecha_ingreso'].setValue(this.cashDate(response.data.fecha_ingreso))
    this.loadJobs(this.form.controls.actividad_economica.value)
  }

  private buildDataForm() {
    let dataForm = { ...this.form.value }
    dataForm.fecha_ingreso = this.utils.buildDate(dataForm.fecha_ingreso)
    return dataForm;
  }

  private cashDate(date) {
    let remoteDate = date.split('-')
    return { year: parseInt(remoteDate[0]), month: parseInt(remoteDate[1]), day: parseInt(remoteDate[2]) };
  }


}

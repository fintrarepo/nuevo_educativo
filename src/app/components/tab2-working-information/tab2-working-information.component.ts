import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as reducers from '../../reducers/reducers';
import { OpenForm, ClosedForm } from '../../actions/address-form.actions';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { SendTab1SubTab2 } from '../../actions/tab1SubTab2.actions';
import { ActivatedRoute } from "@angular/router";
import { UtilsService } from '../../services/utils/utils.service';
import { SendTab2SubTab2, PreSendTab2SubTab2 } from '../../actions/tab2SubTab2.actions';
import { SelecteTab2SubTab1 } from 'src/app/actions/tabs.actions';
import { OpenAlert } from '../../actions/alert.actions';

@Component({
  selector: 'app-tab2-working-information',
  templateUrl: './tab2-working-information.component.html',
  styleUrls: ['./tab2-working-information.component.scss']
})
export class Tab2WorkingInformationComponent implements OnInit {
  form: FormGroup;
  tab1;
  business;
  jobs: any[] = [];

  formData$ = this.store.select(reducers.platformDataForm);
  addressState$ = this.store.select(reducers.getAddressFormState);

  constructor(private store: Store<reducers.State>,
    public formBuilder: FormBuilder,
    private utils: UtilsService,
    private route: ActivatedRoute) {
    this.form = formBuilder.group({
      "actividad_economica": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "ocupacion": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "nombre_empresa": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "cargo": ['', Validators.compose([Validators.maxLength(50)])],
      "tipo_contrato": ['', Validators.compose([Validators.maxLength(50)])],
      "fecha_ingreso": ['', Validators.compose([Validators.maxLength(50)])],
      "direccion": ['', Validators.compose([Validators.maxLength(50)])],
      "telefono": ['', Validators.compose([Validators.maxLength(10), Validators.pattern('^[0-9]*$')])],
      "salario_ing": ['', Validators.compose([Validators.maxLength(8), Validators.required, Validators.pattern('^[0-9]*$')])],
      "otros_ingresos": [0, Validators.compose([Validators.maxLength(8), Validators.pattern('^[0-9]*$')])],
      "total_activos": ['', Validators.compose([Validators.maxLength(8), Validators.required, Validators.pattern('^[0-9]*$')])],
      // "arriendo_egr": ['', Validators.compose([Validators.maxLength(8), Validators.required, Validators.pattern('^[0-9]*$')])],
      // "prestamo_xnomina": [0, Validators.compose([Validators.maxLength(8), Validators.required, Validators.pattern('^[0-9]*$')])],
      "total_pasivos": ['', Validators.compose([Validators.maxLength(8), Validators.required, Validators.pattern('^[0-9]*$')])],
      departamento: ['', Validators.compose([Validators.maxLength(60)])],
      ciudad: ['', Validators.compose([Validators.maxLength(60)])],
      tipo_via: ['', Validators.compose([Validators.maxLength(60)])],
      via_principal: ['', Validators.compose([Validators.maxLength(60)])],
      via_secundaria: ['', Validators.compose([Validators.maxLength(60)])],
      numero: ['', Validators.compose([Validators.maxLength(60),])],
      complemento: ['', Validators.compose([Validators.maxLength(160)])]

    });
    this.business = this.route.snapshot.paramMap.get("id");
    this.addressState$.subscribe(this.addressLoaded.bind(this))

    this.form.controls.actividad_economica.valueChanges.subscribe(this.validateActivity.bind(this))
  }

  ngOnInit() {
  }

  validateActivity(activity) {
    if (activity == 'EPLDO') {
      this.form.controls['cargo'].setValidators([Validators.required, Validators.maxLength(100)])
      this.form.controls['tipo_contrato'].setValidators([Validators.required, Validators.maxLength(50)])
      this.form.controls['fecha_ingreso'].setValidators([Validators.required, Validators.maxLength(50)])
      this.form.controls['direccion'].setValidators([Validators.required, Validators.maxLength(50)])
      this.form.controls['telefono'].setValidators([Validators.required, Validators.maxLength(50)])
    } else {
      this.form.controls['cargo'].setValidators([Validators.maxLength(100)])
      this.form.controls['tipo_contrato'].setValidators([Validators.maxLength(50)])
      this.form.controls['fecha_ingreso'].setValidators([Validators.maxLength(50)])
      this.form.controls['direccion'].setValidators([Validators.maxLength(50)])
      this.form.controls['telefono'].setValidators([Validators.maxLength(50)])
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
      fieldDestinity: "tab2SubTab2" + field
    }));
  }

  closeForm() {
    this.store.dispatch(new ClosedForm());
  }

  addressLoaded(address) {
    if (address.fieldDestinity != "tab2SubTab2direccion") return;
    for (let i in address) {
      if (this.form.controls[i])
        this.form.controls[i].setValue(address[i])
    }
    let complemento = address.complemento ? address.complemento : ''
    this.form.controls.direccion.setValue(address.tipo_via + " " + address.via_principal + " #" + address.via_secundaria + " - " + address.numero + " " + complemento)
    this.form.updateValueAndValidity()
  }


  loadJobs(activity) {
    console.log('DATO OCUPACION', activity);
    
    this.utils.loadJobs(activity).subscribe(response => {
      this.jobs = response.data;
    })
  }

  impForm() {
    this.form.markAllAsTouched()
    if (!this.form.valid) {
      return this.store.dispatch(new OpenAlert({
        open: true,
        title: "Error",
        subTitle: "Por favor verifica los campos e int??ntalo nuevamente.",
        type: "danger"
      }))
    }
    const data = this.buildDataForm()
    const action = new PreSendTab2SubTab2({
      tab: 5,
      final: true,
      numero_solicitud: this.business,
      tabs_info: {
        ...data
      }
    })
    this.store.dispatch(action)
  }

  back() {
    this.store.dispatch(new SelecteTab2SubTab1())
  }

  validator(control) {
    const validator = this.form.get(control).validator({} as AbstractControl);
    if (validator && validator.required) {
      return true;
    }
  }

  private buildDataForm() {
    let dataForm = { ...this.form.value}
    dataForm.fecha_ingreso = this.utils.buildDate(dataForm.fecha_ingreso)
    return dataForm;
  }


}

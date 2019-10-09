import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as reducers from '../../reducers/reducers';
import { OpenForm, ClosedForm } from '../../actions/address-form.actions';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { SendTab1SubTab2 } from '../../actions/tab1SubTab2.actions';
import { ActivatedRoute } from "@angular/router";
import { UtilsService } from '../../services/utils/utils.service';

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

  constructor(private store: Store<reducers.State>,
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
      "fecha_ingreso": ['', Validators.compose([Validators.maxLength(50)])],
      "direccion": ['', Validators.compose([Validators.maxLength(50)])],
      "telefono": ['', Validators.compose([Validators.maxLength(10), Validators.pattern('^[0-9]*$')])],
      // "email": ['', Validators.compose([Validators.maxLength(50), Validators.email])],
      "salario_ing": ['', Validators.compose([Validators.maxLength(8), Validators.required, Validators.pattern('^[0-9]*$')])],
      // "comisiones_ing": ['', Validators.compose([Validators.maxLength(8), Validators.pattern('^[0-9]*$')])],
      // "honorarios_ing": ['', Validators.compose([Validators.maxLength(8), Validators.pattern('^[0-9]*$')])],
      // "arrendamientos_ing": ['', Validators.compose([Validators.maxLength(8), Validators.pattern('^[0-9]*$')])],
      "otros_ingresos": ['', Validators.compose([Validators.maxLength(8), Validators.pattern('^[0-9]*$')])],
      "total_activos": ['', Validators.compose([Validators.maxLength(8), Validators.pattern('^[0-9]*$')])],
      "arriendo_egr": ['', Validators.compose([Validators.maxLength(8), Validators.pattern('^[0-9]*$')])],
      "prestamo_xnomina": ['', Validators.compose([Validators.maxLength(8), Validators.pattern('^[0-9]*$')])],
      "total_pasivos": ['', Validators.compose([Validators.maxLength(8), Validators.pattern('^[0-9]*$')])],
      departamento: ['', Validators.compose([Validators.maxLength(60), Validators.required])],
      ciudad: ['', Validators.compose([Validators.maxLength(60), Validators.required])],
      tipo_via: ['', Validators.compose([Validators.maxLength(60), Validators.required])],
      via_principal: ['', Validators.compose([Validators.maxLength(60), Validators.required])],
      via_secundaria: ['', Validators.compose([Validators.maxLength(60), Validators.required])],
      numero: ['', Validators.compose([Validators.maxLength(60), Validators.required])],
      complementoDireccion: ['', Validators.compose([Validators.maxLength(160)])]

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

    this.form.updateValueAndValidity()
  }

  openForm(field) {
    this.store.dispatch(new OpenForm({
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
    this.form.controls.direccion.setValue(address.tipo_via + " " + address.via_principal + " #" + address.via_secundaria + " - " + address.numero + " " + address.complementoDireccion)
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

  validator(control) {
    const validator = this.form.get(control).validator({} as AbstractControl);
    if (validator && validator.required) {
      return true;
    }
  }

  private buildDataForm() {
    let dataForm = { ...this.form.value }
    dataForm.fecha_ingreso = this.utils.buildDate(dataForm.fecha_ingreso)
    return dataForm;
  }


}

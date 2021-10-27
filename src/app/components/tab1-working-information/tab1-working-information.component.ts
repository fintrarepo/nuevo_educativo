import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as reducers from '../../reducers/reducers';
import { OpenForm, ClosedForm } from '../../actions/address-form.actions';
import { FormBuilder, Validators, FormGroup, AbstractControl, FormControl } from '@angular/forms';
import { SendTab1SubTab2 } from '../../actions/tab1SubTab2.actions';
import { ActivatedRoute } from "@angular/router";
import { UtilsService } from '../../services/utils/utils.service';
import { CreditsService } from '../../services/credits/credits.service';
import { SelecteTab1SubTab1 } from '../../actions/tabs.actions';
import { OpenAlert } from '../../actions/alert.actions';
// var currencyFormatter = require('currency-formatter');

@Component({
  selector: 'app-tab1-working-information',
  templateUrl: './tab1-working-information.component.html',
  styleUrls: ['./tab1-working-information.component.scss']
})
export class Tab1WorkingInformationComponent implements OnInit {
  form: FormGroup;
  tab1;
  business;
  configSelect;
  jobs: any[] = [];
  neighborhoods: any[] = [];

  formData$ = this.store.select(reducers.platformDataForm);
  addressState$ = this.store.select(reducers.getAddressFormState);
  empleado: boolean = false;

  constructor(private credits: CreditsService, private store: Store<reducers.State>,
    public formBuilder: FormBuilder,
    private utils: UtilsService,
    private route: ActivatedRoute) {
    this.form = formBuilder.group({
      "actividad_economica": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "ocupacion": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "direccion": ['', Validators.compose([Validators.maxLength(50)])],
      "salario_ing": ['', Validators.compose([Validators.maxLength(8), Validators.required, Validators.pattern('^[0-9]*$')])],
      "otros_ingresos": [, Validators.compose([Validators.maxLength(8), Validators.pattern('^[0-9]*$')])],
      "total_activos": [, Validators.compose([Validators.maxLength(8), Validators.required, Validators.pattern('^[0-9]*$')])],
      "total_pasivos": [, Validators.compose([Validators.maxLength(8), Validators.required, Validators.pattern('^[0-9]*$')])],
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
    window.scrollTo(0, 0)
    this.configSelect = {
      searchOnKey: 'name',
      searchPlaceholder: 'Buscar',
      moreText: 'Solo se puede seleccionar un barrio',
      height: 'auto',
      placeholder: 'Selecciona tu barrio',
      search: true,
      displayKey: 'name',
      limitTo: 50,
      noResultsFound: 'no se encontro ningun resultado'
  };
  this.credits.autoComplete({
    "numero_solicitud": this.business, "tab": 2
  }).subscribe(this.responseAutoComplete.bind(this))
    this.form.get('ocupacion').valueChanges.subscribe(validate => {
      // this.credits.autoComplete({
      //   "numero_solicitud": this.business, "tab": 2
      // }).subscribe(this.responseAutoComplete.bind(this))
      // tslint:disable-next-line:triple-equals
      if (validate == 'EPLDO') {
        this.empleado = true;
        this.form.removeControl('actividad_especifica');
        this.form.removeControl('barrio');
        this.form.removeControl('antiguedad_negocio');
        this.form.addControl('nombre_empresa', new FormControl('', [Validators.maxLength(50),Validators.required]));
        this.form.addControl('cargo', new FormControl('', [Validators.maxLength(50), Validators.required]));
        this.form.addControl('tipo_contrato', new FormControl('', Validators.required));
        this.form.addControl('fecha_ingreso', new FormControl('', [Validators.maxLength(50), Validators.required]));
        this.form.addControl('telefono', new FormControl('', [Validators.maxLength(10), Validators.required, Validators.pattern('^[0-9]*$')]));
      } else if(validate =='INDNFO'){
        this.empleado = false;
        this.form.removeControl('nombre_empresa');
        this.form.removeControl('cargo');
        this.form.removeControl('tipo_contrato');
        this.form.removeControl('fecha_ingreso');
        this.form.removeControl('telefono');
        this.form.addControl('actividad_especifica', new FormControl('', Validators.required));
        this.form.addControl('barrio', new FormControl('', Validators.required));
        this.form.addControl('antiguedad_negocio', new FormControl('', Validators.required));
      }
    })
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

    this.loadNeighborhood(address.ciudad)
  }

  loadNeighborhood(city) {
    this.utils.getNeighborhood(city).subscribe(response => {
      this.neighborhoods = response.data;
    })
  }

  loadJobs(activity) {
    console.log('CARGA DE ACTIVIDADES', activity);
    
    this.utils.loadJobs(activity).subscribe(response => {
      this.jobs = response.data;
    })
  }

  saveData() {
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
    
    this.loadJobs(this.form.controls.ocupacion.value)
    this.form.controls['fecha_ingreso'].setValue(this.cashDate(response.data.fecha_ingreso))
  }

  private buildDataForm() {
    let dataForm = { ...this.form.value }
    dataForm.fecha_ingreso = this.utils.buildDate(dataForm.fecha_ingreso)
    dataForm.telefono = String(dataForm.telefono)=="undefined"?'':String(dataForm.telefono)
    return dataForm;
  }

  private cashDate(date) {
    let remoteDate = date.split('-')
    return { year: parseInt(remoteDate[0]), month: parseInt(remoteDate[1]), day: parseInt(remoteDate[2]) };
  }


}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms'
import { OpenAlert } from 'src/app/actions/alert.actions';
import { Store } from '@ngrx/store';
import { UtilsService } from '../../services/utils/utils.service'
import { SendSimulation } from 'src/app/actions/simulator.actions';
import { ISimulator, IPreApplication } from '../../models/credits.model';
import { SendPreApplication } from 'src/app/actions/credit.actions';
import * as reducers from '../../reducers/reducers';
import * as moment from 'moment';

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
  dues: any[] = [];
  acceptTerms: boolean = false;
  maxDate: any;
  now: any;
  adultDate: any;
  minDate: any;
  valorCuota: number;
  valorAval: number;

  resultSimulation$ = this.store.select(reducers.getSimulatorResult)

  constructor(public formBuilder: FormBuilder,
    private store: Store<reducers.State>,
    private utils: UtilsService) {
    this.now = moment()
    this.adultDate = moment().subtract(18, "years");
    this.maxDate = { year: this.now.year(), month: this.now.month(), day: this.now.day() }
    this.minDate = { year: this.adultDate.year(), month: this.adultDate.month(), day: this.adultDate.day() }

    this.form = formBuilder.group({
      "tipo_carrera": ['PREGRADO', Validators.compose([Validators.maxLength(50), Validators.required])],
      "entidad": ['EDUCATIVO', Validators.compose([Validators.maxLength(50), Validators.required])],
      "afiliado": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "monto": ['', Validators.compose([Validators.max(100000000), Validators.required])],
      "producto": ['01', Validators.compose([Validators.maxLength(50), Validators.required])],
      "num_cuotas": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "fecha_pago": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "id_convenio": [58, Validators.compose([Validators.maxLength(50), Validators.required])],
      "fecha_credito": ['12'],//NO VAAAAA
      //"tipo_identificacion": ['CC', Validators.compose([Validators.maxLength(50), Validators.required])],
      //"identificacion": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      //"fecha_expedicion": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      //"primer_nombre": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      //"primer_apellido": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      //"email": ['', Validators.compose([Validators.maxLength(50), Validators.required, Validators.email, this.ValidateUrl])],
      "ingresos_usuario": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      //"fecha_nacimiento": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "valor_cuota": [''],
      "valor_aval": [''],
      "empresa": ['FINTRA', Validators.compose([Validators.maxLength(50), Validators.required])],
      // "telefono": ['', Validators.compose([Validators.min(100000), Validators.max(9999999999), Validators.required])],
      "tipo_cliente": [''],
      "financia_aval": ['f', Validators.compose([Validators.maxLength(50), Validators.required])],
      "login": ['APICREDIT', Validators.compose([Validators.maxLength(50), Validators.required])],
      "asesor": ['antojsh'], //NO VAA
      "und_neg": [31, Validators.compose([Validators.maxLength(50), Validators.required])],
      // "departamento": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "ciudad": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "nit_empresa": ['8020220161', Validators.compose([Validators.maxLength(50), Validators.required])],
      "monto_renovacion": [0],
      "politica": [''],
      "negocio_origen": ['']
    })


  }

  ngOnInit() {
    this.dates = this.utils.carcularFecha()
    this.utils.loadCitys().subscribe(cities => {
      this.cities = cities;
    });

    this.resultSimulation$.subscribe(data => {
      if (data) {
        this.valorCuota = data.result.valor_cuota;
        this.valorAval = data.result.valor_aval;
      }
    })
  }

  loadAfiliates() {
    this.utils
      .loadAfiliates(this.form.controls.ciudad.value)
      .subscribe(afiliates => {
        this.afiliates = afiliates.data;
      })
  }

  simulate() {

    if (this.formValidation()) {
      let dataForm = this.buildDataForm()
      const action = new SendSimulation(this.buildObjectBySimulation(dataForm))
      this.store.dispatch(action)
    }

  }

  send() {

    this.form.updateValueAndValidity()
    if (this.formValidation()) {
      let dataForm = this.buildDataForm();
      console.log(dataForm)
      const action = new SendPreApplication(dataForm)
      this.store.dispatch(action)
    }

  }

  getControl(name) {
    return this.form.controls[name]
  }

  buildDues() {
    let currentAffiliate = this.afiliates.filter(x => x.nit_afiliado == this.form.controls['afiliado'].value)[0]

    if (this.form.controls['tipo_carrera'].value == 'POSGRADO') {
      currentAffiliate.cuota_inicial = 6;
      currentAffiliate.cuota_final = 18;
    } else if (this.form.controls['tipo_carrera'].value == 'CONTINUADA') {
      currentAffiliate.cuota_final = 4;
      currentAffiliate.cuota_inicial = 4;
    }
    this.dues = this.buildArrayDues(currentAffiliate.cuota_inicial, currentAffiliate.cuota_final)
  }

  private formValidation() {
    if (!this.form.valid) {
      const action = new OpenAlert({
        open: true,
        title: "Error",
        subTitle: "Verifique los campos",
        type: "warning"
      });
      this.store.dispatch(action)
      return false;
    }

    return true;
  }

  private buildDataForm(): IPreApplication {
    let dataForm = { ...this.form.value }
    // dataForm.fecha_expedicion = this.utils.buildDate(dataForm.fecha_expedicion);
    // dataForm.fecha_nacimiento = this.utils.buildDate(dataForm.fecha_nacimiento);
    dataForm.valor_cuota = this.valorCuota
    dataForm.valor_aval = this.valorAval
    dataForm.num_cuotas = parseInt(dataForm.num_cuotas)
    return dataForm;
  }

  private buildObjectBySimulation(dataForm): ISimulator {
    return {
      monto: dataForm.monto,
      fecha_pago: dataForm.fecha_pago,
      id_convenio: dataForm.id_convenio,
      identificacion: dataForm.identificacion,
      und_neg: dataForm.und_neg,
      num_cuotas: dataForm.num_cuotas
    }
  }

  private buildArrayDues(initial, final) {
    let arrayDues = [];

    for (var i = initial; i <= final; i++) {
      arrayDues.push(parseInt(i))
    }
    return arrayDues;
  }

  private ValidateUrl(control: AbstractControl) {
    if (control.value.includes('@fintra.co') ||
      control.value.includes('@geotech.com.co') ||
      control.value.includes('@selectrik.co') ||
      control.value.includes('@selectrik.com')) {
      return { validUrl: true };
    }
    return null;
  }


}



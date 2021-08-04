import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms'
import { OpenAlert } from 'src/app/actions/alert.actions';
import { Store } from '@ngrx/store';
import { UtilsService } from '../../services/utils/utils.service'
import { SendSimulation, SendSimulationRenewCredit, ResetSimulation } from 'src/app/actions/simulator.actions';
import { ISimulator, IPreApplication } from '../../models/credits.model';
import { SendPreApplication } from 'src/app/actions/credit.actions';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { ListRequestService } from '../../services/list-request/list-request.service'
import * as reducers from '../../reducers/reducers';
import * as moment from 'moment';
import { ShowOrHiddenLoadingForm, ToggleBlurPage } from '../../actions/platform.actions';
import { CreditsService } from '../../services/credits/credits.service';

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
  emails: any[] = [];
  acceptTerms: boolean = false;
  maxDate: any;
  now: any;
  adultDate: any;
  minDate: any;
  valorCuota: number;
  valorAval: number;
  isRenewCredit: boolean = false;
  currentSimulation: any;
  currentRenew: any;

  resultSimulation$ = this.store.select(reducers.getSimulatorResult)
  occupations: any;

  constructor(public formBuilder: FormBuilder,
    private store: Store<reducers.State>,
    private route: ActivatedRoute,
    public auth: AuthService,
    private request: ListRequestService,
    private utils: UtilsService,
    private credit: CreditsService) {
    this.now = moment()

    this.adultDate = moment().subtract(18, "years");
    this.maxDate = { year: this.now.year(), month: this.now.month(), day: this.now.day() }
    this.minDate = { year: this.adultDate.year(), month: this.adultDate.month(), day: this.adultDate.day() }

    this.resultSimulation$.subscribe(this.resultSimutation.bind(this))

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

      "ingresos_usuario": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "tipo_empleo": ['', Validators.required],

      "valor_cuota": [''],
      "valor_aval": [''],
      "empresa": ['FINTRA', Validators.compose([Validators.maxLength(50), Validators.required])],

      "tipo_cliente": [''],
      "financia_aval": ['f', Validators.compose([Validators.maxLength(50), Validators.required])],
      "login": ['APICREDIT', Validators.compose([Validators.maxLength(50), Validators.required])],
      "asesor": ['antojsh'], //NO VAA
      "und_neg": [31, Validators.compose([Validators.maxLength(50), Validators.required])],

      "ciudad": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "nit_empresa": ['8020220161', Validators.compose([Validators.maxLength(50), Validators.required])],
      "semestre": ["", Validators.compose([Validators.maxLength(50)])],
      "monto_renovacion": [0],
      "politica": [''],
      "negocio_origen": [''],


      "tipo_identificacion": ['CED', Validators.compose([Validators.maxLength(50),])],
      "identificacion": ['', Validators.compose([Validators.maxLength(50),])],
      "fecha_expedicion": ['', Validators.compose([Validators.maxLength(50),])],
      "primer_nombre": ['', Validators.compose([Validators.maxLength(50),])],
      "primer_apellido": ['', Validators.compose([Validators.maxLength(50),])],
      "email": ['', Validators.compose([Validators.maxLength(50), , Validators.email, this.ValidateUrl])],
      "email_domain": ['', Validators.compose([Validators.maxLength(50), , Validators.email, this.ValidateEmail])],
      // "email-validation": ['', Validators.compose([Validators.maxLength(50), , Validators.email, this.ValidateUrl, this.confirmEmail])],
      "departamento": ['', Validators.compose([Validators.maxLength(50),])],
      "telefono": ['', Validators.compose([Validators.min(100000), Validators.max(9999999999)])],
      "fecha_nacimiento": ['', Validators.compose([Validators.maxLength(50),])],
    })

    this.isRenewCredit = String(window.location.href).indexOf('renew-credit') > 0;

    this.store.dispatch(new ResetSimulation())

    if (this.auth.tipo_usuario == 'E') {


      this.form.controls.tipo_identificacion.setValidators([Validators.required, Validators.maxLength(100)])
      this.form.controls.identificacion.setValidators([Validators.required, Validators.maxLength(50)])
      this.form.controls.fecha_expedicion.setValidators([Validators.required, Validators.maxLength(100)])
      this.form.controls.primer_nombre.setValidators([Validators.required, Validators.maxLength(100), Validators.minLength(3)])
      this.form.controls.primer_apellido.setValidators([Validators.required, Validators.maxLength(100)])
      this.form.controls.email.setValidators([Validators.required, Validators.maxLength(100), this.ValidateEmail])
      this.form.controls['email_domain'].setValidators([Validators.required])
      // this.form.controls['email-validation'].setValidators([Validators.required, Validators.maxLength(100), Validators.email, this.ValidateUrl, this.confirmEmail])
      this.form.controls.telefono.setValidators([Validators.required, Validators.max(9999999999), Validators.min(999999999)])
      this.form.controls.fecha_nacimiento.setValidators([Validators.required, Validators.maxLength(100)])

      this.loadEmails()

    }
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
    this.loadOccupations();
    if (this.isRenewCredit) {
      this.loadDataRenew(this.route.snapshot.paramMap.get('id'))
    }
  }

  loadAfiliates() {
    this.utils
      .loadAfiliates(this.form.controls.ciudad.value)
      .subscribe(afiliates => {
        this.afiliates = afiliates.data;
        console.log(this.afiliates)
      })
  }

  private loadOccupations() {
    this.credit.loadOccupation()
      .subscribe(response => {
        this.occupations = response
      })
  }

  loadEmails() {
    this.utils
      .getEmails()
      .subscribe(emails => {
        this.emails = emails.data
        console.log(this.emails)
      })
  }

  loadDataRenew(negocio) {
    this.request.getLoan(negocio)
      .subscribe(data => {
        console.log(data)
        this.currentRenew = data[0]
        console.log(this.currentRenew)

        if (this.currentRenew.politica == "T") {
          let date = this.currentRenew.fecha_vencimiento_ultima_cuota.split('-');
          this.dates = this.utils.carcularFecha(this.currentRenew.fecha_vencimiento_ultima_cuota);
        }
      })
  }

  simulate() {
    this.form.markAllAsTouched()
    if (this.formValidation()) {
      if (this.isRenewCredit && this.currentRenew.politica != 'T') {
        this.simulateRenewCredit()
      } else {
        this.simulateNewRequest()
      }
    }

  }

  simulateNewRequest() {
    let dataForm = this.buildDataForm()
    const action = new SendSimulation(this.buildObjectBySimulation(dataForm))
    this.store.dispatch(action)
  }

  simulateRenewCredit() {
    let dataForm = this.buildDataForm()




    const action = new SendSimulationRenewCredit({ ...this.buildObjectBySimulation(dataForm), negocio: this.route.snapshot.paramMap.get('id') })
    this.store.dispatch(action)
  }

  send() {
    const loadingAction = new ShowOrHiddenLoadingForm(true)
    this.store.dispatch(loadingAction)

    const blur = new ToggleBlurPage()
    this.store.dispatch(blur)

    this.form.updateValueAndValidity()
    if (this.formValidation()) {
      if (this.isRenewCredit) {
        this.sendRenewCredit()
      } else {
        this.sendPreApplication()
      }
    }

  }

  sendPreApplication() {
    let dataForm = {
      ...this.buildDataForm(), tipo_usuario: this.auth.tipo_usuario,
      email: this.form.controls.email.value + this.form.controls['email_domain'].value
    }

    const action = new SendPreApplication(dataForm)
    this.store.dispatch(action)
  }

  sendRenewCredit() {
    const politica = this.currentRenew.politica
    let dataForm = { ...this.buildDataForm(), tipo_usuario: this.auth.tipo_usuario }
    let data = {
      ...dataForm,
      monto_renovacion: this.currentRenew.politica == 'T' ? 0 : this.currentSimulation.saldo_credito_anterior,
      politica,
      negocio_origen: this.route.snapshot.paramMap.get('id'),
      email: this.form.controls.email.value + this.form.controls['email_domain'].value
    }

    if (this.currentRenew.politica != 'T') {
      data.valor_cuota = this.currentSimulation.nueva_cuota_aproximada
      data.valor_aval = this.currentSimulation.nuevo_valor_aval
    }
    console.log(data)
    const action = new SendPreApplication(data)
    this.store.dispatch(action)
  }

  resultSimutation(data) {
    if (!data) return;
    this.currentSimulation = data.result;
  }

  getControl(name) {
    return this.form.controls[name]
  }

  buildDues() {
    let currentAffiliate = this.afiliates.filter(x => x.nit_afiliado == this.form.controls['afiliado'].value)[0]
    let cuotaInicial = currentAffiliate.cuota_inicial
    let cuotaFinal = currentAffiliate.cuota_final
    if (this.form.controls['tipo_carrera'].value == 'POSGRADO') {
      cuotaInicial = 6;
      cuotaFinal = 18;

      const monto = this.form.controls['monto'].value;
      cuotaInicial = 6;
      if (monto >= 0 && monto <= 5000000) {
        cuotaFinal = 12;
      } else if (monto > 5000000 && monto <= 10000000) {
        cuotaFinal = 18;
      } else if (monto > 10000000 && monto <= 20000000) {
        cuotaFinal = 24;
      } else if (monto > 20000000) {
        cuotaFinal = 36;
      }
    } else if (this.form.controls['tipo_carrera'].value == 'CONTINUADA') {
      cuotaFinal = 4;
      cuotaInicial = 4;
    }
    this.dues = this.buildArrayDues(cuotaInicial, cuotaFinal)
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

    if (this.auth.tipo_usuario == 'E') {
      dataForm.fecha_expedicion = this.utils.buildDate(dataForm.fecha_expedicion);
      dataForm.fecha_nacimiento = this.utils.buildDate(dataForm.fecha_nacimiento);
    }

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


  private confirmEmail(control: AbstractControl) {
    if (!control.parent) {
      return null;
    }
    if (control.value != control.parent.get('email').value) {
      return { validEmail: true };
    }
    return null;
  }

  ValidateEmail(control: AbstractControl) {
    if (!control.value) {
      return null;
    }
    if (control.value.indexOf('@') > 0) {
      return { validEmail: true };
    }
    return null;
  }


}



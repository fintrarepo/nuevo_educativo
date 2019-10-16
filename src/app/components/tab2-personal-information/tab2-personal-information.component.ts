import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as reducers from '../../reducers/reducers';
import { OpenForm, ClosedForm } from '../../actions/address-form.actions';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UtilsService } from '../../services/utils/utils.service';
import { LoadCitys } from '../../actions/platform.actions';
import { shareReplay } from 'rxjs/operators';
import { SendTab2SubTab1 } from '../../actions/tab2SubTab1.actions';
import { ActivatedRoute } from "@angular/router";
import { CreditsService } from '../../services/credits/credits.service';
import { OpenAlert } from '../../actions/alert.actions';
import { SelecteTab1SubTab3 } from 'src/app/actions/tabs.actions';

@Component({
  selector: 'app-tab2-personal-information',
  templateUrl: './tab2-personal-information.component.html',
  styleUrls: ['./tab2-personal-information.component.scss']
})
export class Tab2PersonalInformationComponent implements OnInit {
  form: FormGroup;
  tab2;
  currentSelectDpto;
  business;
  estudentIsApplicant: boolean = false;
  estudentWorked: boolean = false;

  ciudad_nacimiento: any[] = [];
  ciudad_expedicion_id: any[] = [];
  neighborhoods: any[] = [];

  formData$ = this.store.select(reducers.platformDataForm);
  citys$ = this.store.select(reducers.citys);
  addressState$ = this.store.select(reducers.getAddressFormState);

  constructor(private store: Store<reducers.State>,
    public formBuilder: FormBuilder,
    private credits: CreditsService,
    private utils: UtilsService,
    private route: ActivatedRoute) {
    this.business = this.route.snapshot.paramMap.get("id")
    this.form = formBuilder.group({
      estudiante_solicitante: ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      tipo_id: ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      identificacion: ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      fecha_expedicion_id: ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      primer_apellido: ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      segundo_apellido: ['', Validators.compose([Validators.maxLength(50)])],
      primer_nombre: ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      segundo_nombre: ['', Validators.compose([Validators.maxLength(50)])],
      genero: ['', Validators.compose([Validators.maxLength(1), Validators.required])],
      estado_civil: ['', Validators.compose([Validators.maxLength(1), Validators.required])],
      dpto_expedicion_id: ['', Validators.compose([Validators.maxLength(6), Validators.required])],
      ciudad_expedicion_id: ['', Validators.compose([Validators.maxLength(6), Validators.required])],
      fecha_nacimiento: ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      dpto_nacimiento: ['', Validators.compose([Validators.maxLength(6), Validators.required])],
      ciudad_nacimiento: ['', Validators.compose([Validators.maxLength(6), Validators.required])],
      telefono: ['', Validators.compose([Validators.maxLength(15), Validators.required, Validators.pattern('^[0-9]*$')])],
      email: ['', Validators.compose([Validators.maxLength(100), Validators.required, Validators.email])],
      celular: ['', Validators.compose([Validators.maxLength(15), Validators.required, Validators.pattern('^[0-9]*$')])],
      direccion: ['', Validators.compose([Validators.maxLength(160), Validators.required])],
      barrio: ['', Validators.compose([Validators.maxLength(100), Validators.required])],
      tipo_vivienda: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
      tiempo_residencia: ['', Validators.compose([Validators.maxLength(20), Validators.required])],
      estrato: ['', Validators.compose([Validators.maxLength(1), Validators.required, Validators.pattern('^[0-9]*$')])],
      sisben: ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      nivel_estudio: ['', Validators.compose([Validators.maxLength(15), Validators.required])],
      colegio_bachillerato: ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      trabaja: ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      tipo_carrera: ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      programa: ['', Validators.compose([Validators.maxLength(100), Validators.required])],
      codigo: ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      semestre: ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      parentesco_girador: ['', Validators.compose([Validators.maxLength(20), Validators.required])],
      nivel_educativo_padre: ['', Validators.compose([Validators.maxLength(20), Validators.required])],
      departamento: ['', Validators.compose([Validators.maxLength(60), Validators.required])],
      ciudad: ['', Validators.compose([Validators.maxLength(60), Validators.required])],
      tipo_via: ['', Validators.compose([Validators.maxLength(60), Validators.required])],
      via_principal: ['', Validators.compose([Validators.maxLength(60), Validators.required])],
      via_secundaria: ['', Validators.compose([Validators.maxLength(60), Validators.required])],
      numero: ['', Validators.compose([Validators.maxLength(60), Validators.required])],
      complemento: ['', Validators.compose([Validators.maxLength(160)])],
      universidad: ['Universidad del Norte']
    });

    this.citys$.subscribe(this.citysLoaded.bind(this))
    this.addressState$.pipe(shareReplay()).subscribe(this.addressLoaded.bind(this));

    this.form.controls.estudiante_solicitante.valueChanges
      .subscribe(this.studenWorking.bind(this))


  }

  ngOnInit() {
    this.credits.autoComplete({
      "numero_solicitud": this.business, "tab": 4
    }).subscribe(this.responseAutoComplete.bind(this));

    this.form.controls['estudiante_solicitante'].valueChanges.subscribe(data => {
      this.estudentWorked = data == 'S' ? true : false;
      if (this.estudentWorked) {
        this.form.controls.trabaja.setValue('S');
      }
    })
  }

  openForm() {
    this.store.dispatch(new OpenForm({
      fieldDestinity: "tab2SubTab1"
    }));
  }

  closeForm() {
    this.store.dispatch(new ClosedForm());
  }

  impForm() {
    if (!this.form.valid) {
      return this.store.dispatch(new OpenAlert({
        open: true,
        title: "Error",
        subTitle: "Por favor verifica los campos e inténtalo nuevamente.",
        type: "danger"
      }))
    }
    const data = this.buildDataForm()
    const action = new SendTab2SubTab1({
      tab: 4,
      final: (this.form.controls.trabaja.value == 'S' && this.form.controls.estudiante_solicitante.value == 'S') || (this.form.controls.trabaja.value == 'N' && this.form.controls.estudiante_solicitante.value == 'N') ? true : false,
      numero_solicitud: this.business,
      tabs_info: {
        ...data
      }
    })
    this.store.dispatch(action)
  }

  back() {
    this.store.dispatch(new SelecteTab1SubTab3())
  }

  loadCitys(dpto, control) {
    this.currentSelectDpto = control;
    const action = new LoadCitys({ dpto })
    this.store.dispatch(action)
  }

  citysLoaded(citys) {
    this[this.currentSelectDpto] = citys;
    this.currentSelectDpto = null;
  }

  addressLoaded(address) {
    let newAddress = { test: '', ...address }
    if (newAddress.fieldDestinity == "tab2SubTab1") {
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

  studenWorking(value) {
    if (value == "S") {
      this.enabledFileds(true)
    } else if (value == "N") {
      this.enabledFileds(false)
    }
  }

  enabledFileds(enable) {
    this.estudentIsApplicant = enable;
    const validator = enable ? [Validators.maxLength(100)] : [Validators.maxLength(20), Validators.required]
    this.form.controls.tipo_id.setValidators(validator);
    this.form.controls.identificacion.setValidators(validator);
    this.form.controls.fecha_expedicion_id.setValidators(validator);
    this.form.controls.primer_apellido.setValidators(validator);
    this.form.controls.segundo_apellido.setValidators(validator);
    this.form.controls.primer_nombre.setValidators(validator);
    this.form.controls.segundo_nombre.setValidators(validator);
    this.form.controls.genero.setValidators(validator);
    this.form.controls.estado_civil.setValidators(validator);
    this.form.controls.dpto_expedicion_id.setValidators(validator);
    this.form.controls.ciudad_expedicion_id.setValidators(validator);
    this.form.controls.fecha_nacimiento.setValidators(validator);
    this.form.controls.dpto_nacimiento.setValidators(validator);
    this.form.controls.ciudad_nacimiento.setValidators(validator);
    this.form.controls.telefono.setValidators(validator);
    this.form.controls.email.setValidators(validator);
    this.form.controls.celular.setValidators(validator);
    this.form.controls.direccion.setValidators(validator);
    this.form.controls.barrio.setValidators(validator);
    this.form.controls.tipo_vivienda.setValidators(validator);
    this.form.controls.tiempo_residencia.setValidators(validator);
    this.form.controls.estrato.setValidators(validator);
    this.form.controls.sisben.setValidators(validator);
    this.form.controls.nivel_estudio.setValidators(validator);
    this.form.controls.colegio_bachillerato.setValidators(validator);
    this.form.controls.trabaja.setValidators(validator);
    this.form.controls.departamento.setValidators(validator);
    this.form.controls.ciudad.setValidators(validator);
    this.form.controls.tipo_via.setValidators(validator);
    this.form.controls.via_principal.setValidators(validator);
    this.form.controls.via_secundaria.setValidators(validator);
    this.form.controls.numero.setValidators(validator);

    this.form.controls.tipo_id.updateValueAndValidity()
    this.form.controls.identificacion.updateValueAndValidity()
    this.form.controls.fecha_expedicion_id.updateValueAndValidity()
    this.form.controls.primer_apellido.updateValueAndValidity()
    this.form.controls.segundo_apellido.updateValueAndValidity()
    this.form.controls.primer_nombre.updateValueAndValidity()
    this.form.controls.segundo_nombre.updateValueAndValidity()
    this.form.controls.genero.updateValueAndValidity()
    this.form.controls.estado_civil.updateValueAndValidity()
    this.form.controls.dpto_expedicion_id.updateValueAndValidity()
    this.form.controls.ciudad_expedicion_id.updateValueAndValidity()
    this.form.controls.fecha_nacimiento.updateValueAndValidity()
    this.form.controls.dpto_nacimiento.updateValueAndValidity()
    this.form.controls.ciudad_nacimiento.updateValueAndValidity()
    this.form.controls.telefono.updateValueAndValidity()
    this.form.controls.email.updateValueAndValidity()
    this.form.controls.celular.updateValueAndValidity()
    this.form.controls.direccion.updateValueAndValidity()
    this.form.controls.barrio.updateValueAndValidity()
    this.form.controls.tipo_vivienda.updateValueAndValidity()
    this.form.controls.tiempo_residencia.updateValueAndValidity()
    this.form.controls.estrato.updateValueAndValidity()
    this.form.controls.sisben.updateValueAndValidity()
    this.form.controls.nivel_estudio.updateValueAndValidity()
    this.form.controls.colegio_bachillerato.updateValueAndValidity()
    this.form.controls.trabaja.updateValueAndValidity()
    this.form.controls.departamento.updateValueAndValidity()
    this.form.controls.ciudad.updateValueAndValidity()
    this.form.controls.tipo_via.updateValueAndValidity()
    this.form.controls.via_principal.updateValueAndValidity()
    this.form.controls.via_secundaria.updateValueAndValidity()
    this.form.controls.numero.updateValueAndValidity()
  }

  responseAutoComplete(response) {
    console.log(response)
    for (let i in response.data) {
      if (this.form.controls[i]) {
        if (i == 'fecha_nacimiento') {
          this.form.controls[i].setValue(this.cashDate(response.data.fecha_nacimiento))
        } else if (i == 'fecha_expedicion_id') {
          this.form.controls[i].setValue(this.cashDate(response.data.fecha_expedicion_id))
        }
        else {
          this.form.controls[i].setValue(response.data[i])
        }
      }

    }

    setTimeout(() => {
      this.loadCitys(this.form.controls.dpto_expedicion_id.value, 'ciudad_expedicion_id');
    }, 500)
    //
    this.loadCitys(this.form.controls.dpto_nacimiento.value, 'ciudad_nacimiento');
    this.loadNeighborhood(response.data.ciudad);
  }

  private cashDate(date) {
    let remoteDate = date.split('-')
    return { year: parseInt(remoteDate[0]), month: parseInt(remoteDate[1]), day: parseInt(remoteDate[2]) };
  }


  private buildDataForm() {
    let dataForm = { ...this.form.value }
    dataForm.fecha_expedicion_id = this.utils.buildDate(dataForm.fecha_expedicion_id)
    dataForm.fecha_nacimiento = this.utils.buildDate(dataForm.fecha_nacimiento)
    dataForm.estrato = parseInt(dataForm.estrato)
    dataForm.identificacion = String(dataForm.identificacion)
    return dataForm;
  }


}

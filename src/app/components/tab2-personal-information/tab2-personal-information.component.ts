import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as reducers from '../../reducers/reducers';
import { OpenForm, ClosedForm } from '../../actions/address-form.actions';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UtilsService } from '../../services/utils/utils.service';
import { LoadCitys } from '../../actions/platform.actions';
import { shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-tab2-personal-information',
  templateUrl: './tab2-personal-information.component.html',
  styleUrls: ['./tab2-personal-information.component.scss']
})
export class Tab2PersonalInformationComponent implements OnInit {
  form: FormGroup;
  tab2;
  currentSelectDpto;
  estudentIsApplicant: boolean = false;

  ciudad_nacimiento: any[] = [];
  ciudad_expedicion_id: any[] = [];
  neighborhoods: any[] = [];

  formData$ = this.store.select(reducers.platformDataForm);
  citys$ = this.store.select(reducers.citys);
  addressState$ = this.store.select(reducers.getAddressFormState);

  constructor(private store: Store<reducers.State>, public formBuilder: FormBuilder, private utils: UtilsService) {
    this.form = formBuilder.group({
      "estudiante_solicitante": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "tipo_id": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "identificacion": ['', Validators.compose([Validators.maxLength(50), Validators.required, Validators.pattern('^[0-9]*$')])],
      "fecha_expedicion_id": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "primer_apellido": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "segundo_apellido": ['', Validators.compose([Validators.maxLength(50)])],
      "primer_nombre": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "segundo_nombre": ['', Validators.compose([Validators.maxLength(50)])],
      "genero": ['', Validators.compose([Validators.maxLength(1), Validators.required])],
      "estado_civil": ['', Validators.compose([Validators.maxLength(1), Validators.required])],
      "dpto_expedicion_id": ['', Validators.compose([Validators.maxLength(6), Validators.required])],
      "ciudad_expedicion_id": ['', Validators.compose([Validators.maxLength(6), Validators.required])],
      "fecha_nacimiento": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "dpto_nacimiento": ['', Validators.compose([Validators.maxLength(6), Validators.required])],
      "ciudad_nacimiento": ['', Validators.compose([Validators.maxLength(6), Validators.required])],
      "telefono": ['', Validators.compose([Validators.maxLength(15), Validators.required, Validators.pattern('^[0-9]*$')])],
      "email": ['', Validators.compose([Validators.maxLength(100), Validators.required, Validators.email])],
      "celular": ['', Validators.compose([Validators.maxLength(15), Validators.required, Validators.pattern('^[0-9]*$')])],
      "direccion": ['', Validators.compose([Validators.maxLength(160), Validators.required])],
      "barrio": ['', Validators.compose([Validators.maxLength(100), Validators.required])],
      "tipo_vivienda": ['', Validators.compose([Validators.maxLength(30), Validators.required])],
      "tiempo_residencia": ['', Validators.compose([Validators.maxLength(20)])],
      "estrato": ['', Validators.compose([Validators.maxLength(1), Validators.required, Validators.pattern('^[0-9]*$')])],
      "sisben": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "nivel_estudio": ['', Validators.compose([Validators.maxLength(15), Validators.required])],
      "colegio_bachillerato": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "trabaja": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "tipo_carrera": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "programa": ['', Validators.compose([Validators.maxLength(100), Validators.required])],
      "codigo": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "semestre": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "parentesco_girador": ['', Validators.compose([Validators.maxLength(20), Validators.required])]
    });

    this.citys$.subscribe(this.citysLoaded.bind(this))
    this.addressState$.pipe(shareReplay()).subscribe(this.addressLoaded.bind(this));

    this.form.controls.estudiante_solicitante.valueChanges
      .subscribe(this.studenWorking.bind(this))
  }

  ngOnInit() {
  }

  openForm() {
    this.store.dispatch(new OpenForm({
      fieldDestinity: "tab2"
    }));
  }

  closeForm() {
    this.store.dispatch(new ClosedForm());
  }

  impForm() {
    console.log(JSON.stringify(this.form.value));
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
    if (newAddress.fieldDestinity == "tab2") {
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
    const validator = enable ? [Validators.maxLength(20), Validators.required] : [Validators.maxLength(100)]
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
  }

}

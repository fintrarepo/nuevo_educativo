import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as reducers from '../reducers/reducers';
import { OpenForm } from '../actions/address-form.actions';
import { CreditsService } from '../services/credits/credits.service';
import { UtilsService } from '../services/utils/utils.service';
import { InfoFormRequest, ToggleBlurPage } from '../actions/platform.actions';
import { shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-update-info',
  templateUrl: './update-info.component.html',
  styleUrls: ['./update-info.component.scss']
})
export class UpdateInfoComponent implements OnInit {

  termsAndConditions: boolean = false;
  form: FormGroup;
  dpt: any[] = [];
  citys: any[] = [];
  code = "";
  addressState$ = this.store.select(reducers.getAddressFormState);
  blurPage$ = this.store.select(reducers.platformIsBlur);
  state = "FILL_FORM";

  constructor(public formBuilder: FormBuilder,
    private credit: CreditsService,
    private utils: UtilsService,
    private store: Store<reducers.State>) {

    this.form = formBuilder.group({
      "coddpto": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "nomcli": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "nit": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "direccion": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "telcontacto": ['', Validators.compose([Validators.max(9999999999), Validators.required])],
      // "email": ['', Validators.compose([Validators.maxLength(50), Validators.required, Validators.email])],
      "ciudad": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "barrio": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      // "email_validator": ['', Validators.compose([Validators.maxLength(50), Validators.required, Validators.email, this.emailValidator('email'),])],
    })

    this.addressState$.pipe(shareReplay()).subscribe(this.addressLoaded.bind(this));

  }

  ngOnInit() {
    this.credit.loadInfoForm()
      .subscribe(data => {
        this.dpt = data.info.data.DPTO
        console.log(this.dpt)
      })

    this.store.dispatch(new InfoFormRequest());
  }

  goToFintra(){
    window.top.location.href = "https://www.fintra.co";
  }

  loadCitys(dpto) {
    this.credit.loadCitys(dpto)
      .subscribe(response => {
        this.citys = response.data;
      })
  }

  getUserInfo() {
    this.utils.getUserInfoByUpdateInfo(this.form.controls['nit'].value)
      .subscribe(data => {
        if (data.length > 0) {
          this.fillForm(data[0])
        }
      })
  }

  sendSmsCode() {
    this.utils.sendSmsCode(this.form.controls.nit.value, this.form.controls.telcontacto.value)
      .subscribe(data => {
        this.state = 'FILL_CODE';
      }, err => {
        console.log(err)
      })
  }

  sendData() {
    this.utils.updateUser({ ...this.form.value, code: this.code })
      .subscribe(data => {
        this.state = 'DATE_UPDATED';
      }, err => {
        alert(err.error.message || 'Ha ocurrido un error al actualizar los datos, intentalo nuevamente')
      })
  }


  validateData(){
    this.utils.isMyData({ ...this.form.value})
      .subscribe(data => {
        this.state = 'DATE_UPDATED';
      }, err => {
        alert(err.error.message || 'Ha ocurrido un error al actualizar los datos, intentalo nuevamente')
      })
  }

  fillForm(data) {
    for (let i in data) {
      if (this.form.controls[i]) {
        this.form.controls[i].setValue(data[i])
        this.form.controls[i].markAsTouched()
        this.form.controls[i].markAsPristine()
        this.form.controls[i].updateValueAndValidity()
      }
    }

    // this.form.controls['email_validator'].setValue(this.form.controls['email'].value)
    this.loadCitys(this.form.controls['coddpto'].value)


  }

  openForm(field) {
    this.store.dispatch(new OpenForm({
      departamento: this.form.controls.coddpto.value,
      ciudad: this.form.controls.ciudad.value,
      complemento: null,
      via_principal: null,
      via_secundaria: null,
      tipo_via: null,
      visible: true,
      numero: null,
      fieldDestinity: "updateInfo"
    }));
  }


  addressLoaded(newAddress) {
    if (newAddress.fieldDestinity == 'updateInfo') {
      if (!newAddress.via_principal) return;
      let complemento = newAddress.complemento ? newAddress.complemento : ''
      this.form.controls.direccion.setValue(newAddress.tipo_via + " " + newAddress.via_principal + " #" + newAddress.via_secundaria + " - " + newAddress.numero + " " + complemento)

    }
  }

  get validateCode() {
    return String(this.code).length == 6
  }

  private emailValidator(confirmEmailInput: string) {
    let confirmEmailControl: FormControl;
    let emailControl: FormControl;

    return (control: FormControl) => {
      if (!control.parent) {
        return null;
      }

      if (!confirmEmailControl) {
        confirmEmailControl = control;
        emailControl = control.parent.get(confirmEmailInput) as FormControl;
        emailControl.valueChanges.subscribe(() => {
          confirmEmailControl.updateValueAndValidity();
        });
      }

      if (
        emailControl.value.toLocaleLowerCase() !==
        confirmEmailControl.value.toLocaleLowerCase()
      ) {
        return {
          notMatch: true
        };
      }
      return null;
    };
  }

}

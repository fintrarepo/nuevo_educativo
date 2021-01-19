import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as reducers from '../../reducers/reducers';
import { Store } from '@ngrx/store';
import { CreditsService } from '../../services/credits/credits.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalTermns } from '../modals/terminos/modalTermns';

@Component({
  selector: 'app-signing',
  templateUrl: './signing.component.html',
  styleUrls: ['./signing.component.scss']
})
export class SigningComponent implements OnInit {

  listRequest$ = this.store.select(reducers.getListRequestResponse);

  tapSigning: number;
  otpForm: FormGroup;
  signingForm: FormGroup;
  inforequest: any;
  notfound: boolean;
  isLoading: boolean = false;
  textError: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store<reducers.State>,
    private modalService: NgbModal,
    private creditService: CreditsService
  ) {
    this.tapSigning = 2;
    this.notfound = false;
    // form otp
    this.otpForm = this.formBuilder.group({
      otp: ['', Validators.required]
    });
    // form contraseña firma
    this.signingForm = this.formBuilder.group({
      conditions: ['', Validators.requiredTrue],
      contrasena: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(8), this.numberValid,  this.lowercaseUppercaseValid]],
      confirmcontrasena: ['', Validators.required]
    }, { validator: this.confirmPassword });
  }
  
  ngOnInit() {
    this.listRequest$.subscribe(data => {
      this.inforequest = data;
    })
  }
  validarOtp() {
    if (this.otpForm.valid) {
      this.isLoading = true;
      this.notfound = false;
      this.creditService.validateOtp({'cod-otp':this.otpForm.value.otp}).subscribe(data => {
        console.log(data.detail)
        this.tapSigning = 2;
        this.isLoading = false;
      }, err => {
        this.notfound = true;
        this.textError = err.error.detail;
        console.log(this.textError);
      })
      this.isLoading = false;
    }

  }

  nextTap(tap: number) {
    this.tapSigning = tap;
  }

  backUpdate() {
    this.router.navigate(['/app/upload/', this.inforequest.cod_neg])
  }

  aceptarTerminos(event: Event) {
    event.preventDefault();
    const modalRef: NgbModalRef = this.modalService.open(ModalTermns, { backdrop: 'static', centered: true, size: 'xl' });
    modalRef.result.then(null, (imgModal: any) => { });
  }

  get code() {
    return this.otpForm.get('otp');
  }
  get contra() {
    return this.signingForm.get('contrasena');
  }
  get confContra() {
    return this.signingForm.get('confirmcontrasena');
  }
  get condiciones() {
    return this.otpForm.get('conditions');
  }

  /**
   * 
   * @param group Es el formulario en el que se esta haciendo la validación
   */
  confirmPassword(group: FormGroup) {
    const pass = group.controls.contrasena.value;
    const confirmpass = group.controls.confirmcontrasena.value;
    if (pass !== confirmpass) {
      group.controls.confirmcontrasena.setErrors({ notSame: true });
    }
  }

  /**
   * 
   * @param control El control sobre el cual se esta haciendo la validación
   */
  numberValid(control: FormControl): { [s: string]: boolean } {
    const mayuscula = new RegExp('.*[0-9].*');
    if (!control.value.match(mayuscula) && control.value !== '') {
      return { notNumber: true };
    }
    return null;
  }

  lowercaseUppercaseValid(control: FormControl): { [s: string]: boolean } {
    const mayuscula = new RegExp('.*[a-zA-Z].*');
    if (!control.value.match(mayuscula) && control.value !== '') {
      return { notLowerUpper: true };
    }
    return null;
  }

  // repeatLetter(control: FormControl): { [s: string]: boolean } {
  //   const repeat = new RegExp('.*([a-z])\1\1\1\1.*');
  //   if (!control.value.match(repeat) && control.value !== '') {
  //     return { notRepite: true };
  //   }
  //   return null;
  // }
}

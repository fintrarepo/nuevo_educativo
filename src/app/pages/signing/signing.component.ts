import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as reducers from '../../reducers/reducers';
import { Store } from '@ngrx/store';
import { CreditsService } from '../../services/credits/credits.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalTermns } from '../modals/terminos/modalTermns';
import { ModalMessage } from '../modals/message/modalMessage';

@Component({
  selector: 'app-signing',
  templateUrl: './signing.component.html',
  styleUrls: ['./signing.component.scss']
})
export class SigningComponent implements OnInit {

  tapSigning: number;
  otpForm: FormGroup;
  signingForm: FormGroup;
  notfound: boolean;
  isLoading: boolean = false;
  textError: string;
  cod_negocio: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private modalService: NgbModal,
    private creditService: CreditsService,
    private activateRoter: ActivatedRoute
  ) {
    this.tapSigning = 1;
    this.notfound = false;
    // form otp
    this.otpForm = this.formBuilder.group({
      otp: ['', Validators.required]
    });
    // form contraseña firma
    this.signingForm = this.formBuilder.group({
      conditions: ['', Validators.requiredTrue],
      contrasena: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(8), this.numberValid, this.lowercaseUppercaseValid]],
      confirmcontrasena: ['', Validators.required]
    }, { validator: this.confirmPassword });
  }

  ngOnInit() {
    this.activateRoter.params.subscribe(({id}) => {
      this.cod_negocio = id;
    })
  }
  validarOtp() {
    if (this.otpForm.valid) {
      this.isLoading = true;
      this.notfound = false;
      this.creditService.validateOtp({ 'cod-otp': this.otpForm.value.otp }).subscribe(data => {
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
    this.router.navigate(['/app/upload/', this.cod_negocio])
  }

  aceptarTerminos(event: Event) {
    event.preventDefault();
    const modalRef: NgbModalRef = this.modalService.open(ModalTermns, { backdrop: 'static', centered: true, size: 'xl' });
    modalRef.result.then(null, (acepted: any) => {
      this.signingForm.patchValue({
        conditions: acepted
      })
    });
  }

  firmar() {
    if (this.signingForm.invalid) {
      return;
    }
    const data = {
      'firma': this.signingForm.value.contrasena,
      'cod-negocio': this.cod_negocio,
      'unidad': '31'
    };
    console.log(data);

    this.creditService.signing(data).subscribe(data => {
      const modalRef: NgbModalRef = this.modalService.open(ModalMessage, { backdrop: 'static', centered: true});
      modalRef.result.then(null, () => {
        this.router.navigate(['/app/dashboard/requests'])
      });
      console.log(data)
    }, err => {
      this.textError = err.error.detail;
    })

  }
  goBack() {
    this.tapSigning = 1;
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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
  mensaje: any;
  numSolicitud: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private modalService: NgbModal,
    private creditService: CreditsService,
    private activateRoter: ActivatedRoute
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
      contrasena: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(8), this.numberValid, this.lowercaseUppercaseValid, this.repeatLetter]],
      confirmcontrasena: ['', Validators.required]
    }, { validator: this.confirmPassword });
  }

  ngOnInit() {
    this.activateRoter.params.subscribe(({ id, sol }) => {
      this.cod_negocio = id;
      this.numSolicitud = sol;
    })
    this.creditService.dataOto$.subscribe(dato => this.mensaje = dato);
  }

  validarOtp() {
    if (this.otpForm.valid) {
      this.isLoading = true;
      this.notfound = false;
      this.creditService.validateOtp({ 'cod-otp': this.otpForm.value.otp }).subscribe(data => {
        this.tapSigning = 2;
        this.isLoading = false;
      }, err => {
        this.notfound = true;
        this.textError = err.error.detail;
        this.isLoading = false;
      })
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
    this.isLoading = true;
    const data = {
      'firma': this.signingForm.value.contrasena,
      'cod-negocio': this.cod_negocio,
      'unidad': '31',
      'cod-solicitud': this.numSolicitud
    };

    this.creditService.signing(data).subscribe(data => {
      this.isLoading = false;
      const modalRef: NgbModalRef = this.modalService.open(ModalMessage, { backdrop: 'static', centered: true });
      modalRef.componentInstance.message = data;
      modalRef.result.then(null, () => {
        this.router.navigate(['/app/dashboard/requests'])
      });
    }, err => {
      this.isLoading = false;
      this.textError = err.error.detail;
    })

  }
  goBack() {
    this.tapSigning = 1;
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
    return null;
  }

  /**
   * 
   * @param control El control sobre el cual se esta haciendo la validación
   */
  numberValid(control: FormControl): { [s: string]: boolean } {
    const mayuscula = new RegExp('.*[0-9].*');
    if (control.value !== '' && !control.value.match(mayuscula)) {
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

  repeatLetter(control: FormControl): { [s: string]: boolean } {
    const repeat = new RegExp('.*([a-z])\\1{4,}.*');
    if (control.value !== '' && control.value.match(repeat)) {
      // if (control.value !== '' && repeat.test(control.value)) {
      return { notRepite: true };
    }
    return null;
  }
}

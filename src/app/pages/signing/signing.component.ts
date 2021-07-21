import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CreditsService } from '../../services/credits/credits.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalTermns } from '../modals/terminos/modalTermns';
import { ModalMessage } from '../modals/message/modalMessage';
import { SigningService } from '../../services/signing/signing.service';
import { asyncScheduler, interval, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-signing',
  templateUrl: './signing.component.html',
  styleUrls: ['./signing.component.scss']
})
export class SigningComponent implements OnInit {

  counter$: Observable<number>;

  tapSigning: number;
  seconds: number;
  otpForm: FormGroup;
  signingForm: FormGroup;
  notfound: boolean;
  isLoading: boolean = false;
  showTime: boolean = true;
  textError: string;
  cod_negocio: string;
  mensaje: any;
  numSolicitud: any;
  tipoUser: any;
  uniNegocio: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private modalService: NgbModal,
    private creditService: CreditsService,
    private activateRouter: ActivatedRoute,
    private signingService: SigningService
  ) {
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
    this.counter$ = interval(1000, asyncScheduler).pipe(
      map(
        x => 180 - x
      ),
      take(181)
    );
  }

  ngOnInit() {
    this.activateRouter.params.subscribe(({ id, num, tipo, neg }) => {
      this.cod_negocio = id;
      this.numSolicitud = num;
      this.tipoUser = tipo;
      this.uniNegocio = neg;
    })
    if (this.tipoUser && this.uniNegocio) {
      this.tapSigning = 2;

    } else {
      this.tapSigning = 1;
      this.countDown();
    }
    this.creditService.dataOto$.subscribe(dato => this.mensaje = dato);
  }

  countDown() {
    this.showTime = true;
    this.counter$.subscribe(next => {
      this.seconds = next;

    },
      err => { },
      () => {
        this.showTime = false;
      })
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
        this.textError = err.error.data.detail;
        this.isLoading = false;
      })
    }

  }

  nextTap(tap: number) {
    this.tapSigning = tap;
  }

  backUpdate() {
    this.router.navigate([`/app/upload/${this.cod_negocio}/${this.numSolicitud}`])
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

    // codeudor
    if (this.tipoUser && this.uniNegocio) {
      const data = {
        'firma': this.signingForm.value.contrasena,
        'tipo': this.tipoUser,
        'unidad': this.uniNegocio,
        'cod-solicitud': this.numSolicitud
      };

      this.signingService.signing(data).subscribe(data => {
        this.isLoading = false;
        const modalRef: NgbModalRef = this.modalService.open(ModalMessage, { backdrop: 'static', centered: true });
        modalRef.componentInstance.message = data;
        modalRef.result.then(null, () => {
          this.router.navigate(['send-sms/' + this.numSolicitud + '/' + this.tipoUser + '/' + this.uniNegocio])
        });
      }, err => {
        this.isLoading = false;
        this.textError = err.error.detail;
      })
    } else {
      // firma tirular
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

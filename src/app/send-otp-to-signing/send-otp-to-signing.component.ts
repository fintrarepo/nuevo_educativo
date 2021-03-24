import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { listFile } from '../models/credits.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SigningService } from '../services/signing/signing.service';
import { ModalMessage } from '../pages/modals/message/modalMessage';
import { CreditsService } from '../services/credits/credits.service';
import { ModalPdf } from '../pages/modals/pdf/modalPdf';

@Component({
  selector: 'app-send-otp-to-signing',
  templateUrl: './send-otp-to-signing.component.html',
  styleUrls: ['./send-otp-to-signing.component.scss']
})
export class SendOtpToSigningComponent implements OnInit {

  phoneForm: FormGroup;
  documentsForm: FormGroup;
  keyForm: FormGroup;

  stepSigning: number = 0;
  isLoading: boolean = false;
  notfound : boolean = false;
  signinFiles: any = [];
  numSolicitud: string;
  tipoUser: string;
  uniNegocio: number;
  showStep: boolean;
  loadingRequest: boolean = false;
  mDeceval: boolean = false;
  main: string;
  errors: boolean;
  textError: any;
  msjDeceval: any;

  constructor(
    private signingService: SigningService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private activateRouter: ActivatedRoute,
    private creditService: CreditsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.main = window.innerHeight + 'px';

    this.phoneForm = this.fb.group({
      phone: ['', Validators.required]
    })
    this.keyForm = this.fb.group({
      key: ['', Validators.required]
    })
    this.documentsForm = this.fb.group({
      pagare_deceval: ['', Validators.requiredTrue],
      terminos_y_condiciones: ['', [Validators.requiredTrue]],
      fianza_titular: ['', [Validators.requiredTrue]]
    })

    this.activateRouter.params.subscribe(({ num, tipo, neg }) => {
      this.numSolicitud = num;
      this.tipoUser = tipo;
      this.uniNegocio = neg;
    })
    if (this.numSolicitud && this.tipoUser) {
      this.validateSigning();
    }
    this.documentsForm.get('pagare_deceval').valueChanges.subscribe(validate => {
      if (validate) {
        this.verPagare();
      }
    });
    this.showStep = true;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.main = window.innerHeight + 'px';
  }

  sendSms() {
    if (!this.phoneForm.valid) {
      return;
    }
    this.isLoading = true;
    const params = {
      "num-celular": this.phoneForm.value.phone
    }
    this.signingService.sendDinamicKey(params)
      .subscribe(res => {
        const modalRef: NgbModalRef = this.modalService.open(ModalMessage, { backdrop: 'static', centered: true });

        if (res.success) {
          modalRef.componentInstance.message = res.data;
        }
        modalRef.result.then(null, () => {
          this.stepSigning = 3;
          this.isLoading = false;
        });
      },
        err => {

        })
  }

  goSigning() {
    if (!this.keyForm.valid) {
      return;
    }
    this.notfound = true;
    this.isLoading = true;
    const params = {
      "num-celular": this.phoneForm.value.phone,
      "cod-otp": this.keyForm.value.key
    }
    this.signingService.validateDinamicKey(params).subscribe(res => {
      this.isLoading = false;
      this.router.navigate([`signing/${this.numSolicitud}/${this.tipoUser}/${this.uniNegocio}`]);
    },
      err => {
        this.notfound = true;
        this.textError = err.error.data.detail;
        this.isLoading = false;

      })
  }

  validateSigning() {
    this.loadingRequest = true;
    const params = {
      'cod-solicitud': this.numSolicitud,
      'tipo': this.tipoUser
    };
    this.signingService.validateDeceval(params)
      .subscribe(res => {
        if (res.success) {
          this.loadListFile();
          this.loadingRequest = false;
          this.stepSigning = 1;
          this.phoneForm.patchValue({
            phone: res.data
          });
          this.showStep = true;
        } else {
          this.showStep = false;
          this.errors = false;
        }
        // window.open(encodeURIComponent(x.data));
        // window.open(x.data);
      },
        err => {
          this.showStep = false;
          this.errors = true;
        })
  }

  loadListFile() {
    const params: listFile = {
      option: 12,
      numero_solicitud: this.numSolicitud,
      user: 'API_FINTRA',
      und_negocio: this.uniNegocio
    };
    // documentos a firmar
    this.creditService.loadFileList(params).subscribe(list => {
      this.isLoading = false;
      this.signinFiles = list.data;
      // const filesUploaded = this.listFiles.filter(x => x.url != '')
      // this.allFileUploaded = filesUploaded.length == 3 ? true : false;

    });

  }

  downloadFile(file) {
    if (file.url === '') {
      this.viewPdf("/assets/pdf/" + file.id_archivo + ".pdf");
    }

    if (file.url != '') {
      this.verPagare();
    }
  }
  verPagare() {
    this.isLoading = true;
    const params = { "cod-solicitud": String(this.numSolicitud) }
    return this.creditService.pagare(params)
      .subscribe(
        x => {
          this.viewPdf(x.data);
          this.isLoading = false;
          this.mDeceval = false;
        },
        err => {
          this.isLoading = false;
          this.mDeceval = true;
          console.log(err);
          
          // this.msjDeceval = err.error.detail.detail;
          this.msjDeceval = 'Error comunicación DECEVAL.';
        })
  }

  viewPdf(item) {
    const modalRef: NgbModalRef = this.modalService.open(ModalPdf, { backdrop: 'static', centered: true, size: 'xl' });
    modalRef.componentInstance.url_pdf = item;
  }

}

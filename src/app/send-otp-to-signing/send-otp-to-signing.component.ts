import { Component, OnInit, HostListener} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { listFile } from '../models/credits.model';
import { ActivatedRoute } from '@angular/router';
import { SigningService } from '../services/signing/signing.service';

@Component({
  selector: 'app-send-otp-to-signing',
  templateUrl: './send-otp-to-signing.component.html',
  styleUrls: ['./send-otp-to-signing.component.scss']
})
export class SendOtpToSigningComponent implements OnInit {

  phoneForm: FormGroup;
  documentsForm: FormGroup;
  stepSigning: number = 1;
  isLoading: boolean = false;
  signinFiles: any = [];
  numSolicitud: string;
  tipoUser: string;
  uniNegocio: number;
  showStep: boolean;
  main: string;

  constructor(
    private signingService: SigningService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private activateRouter: ActivatedRoute
  ) { }

  ngOnInit() {
    this.main = window.innerHeight + 'px';
    this.phoneForm = this.fb.group({
      phone: ['', Validators.required]
    })
    this.documentsForm = this.fb.group({
      pagare_deceval: ['', Validators.required]
    })
    this.activateRouter.params.subscribe(({ num, tipo, neg }) => {
      this.numSolicitud = num;
      this.tipoUser = tipo;
      this.uniNegocio = neg;
    })
    if (this.numSolicitud && this.tipoUser) {
      this.validateSigning()
    }
    this.showStep = true;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.main = window.innerHeight + 'px';
  }

  validarPhone() { }
  goSigning() { }

  validateSigning() {
    const params = {
      'cod-solicitud': this.numSolicitud,
      'tipo': this.tipoUser
    };
    this.signingService.validateDeceval(params)
      .subscribe(res => {
        if (res.success) {
          this.showStep = true;
          this.stepSigning = 1;
        }
        // window.open(encodeURIComponent(x.data));
        // window.open(x.data);
      },
      err => {
        this.showStep = false;
      })
  }

  sendSms() {
    const params = {
      'cod-solicitud': this.numSolicitud,
      'tipo': this.tipoUser
    };
    this.signingService.sendDinamicKey(params)
      .subscribe(res => {
        if (res.success) {
          this.showStep = true;
          this.stepSigning = 1;
        }
        // window.open(encodeURIComponent(x.data));
        // window.open(x.data);
      },
      err => {
        this.showStep = false;
      })
  }

  // loadListFile() {
  //   const negocio = this.route.snapshot.paramMap.get('id');
  //   const params: listFile = {
  //     option: 12,
  //     numero_solicitud: negocio,
  //     user: this.auth.id_usuario,
  //     und_negocio: 31
  //   };
  //   // documentos a firmar
  //   this.creditService.loadFileList(params).subscribe(list => {
  //     this.isLoading = false;
  //     this.signinFiles = list.data;
  //     const filesUploaded = this.listFiles.filter(x => x.url != '')
  //     this.allFileUploaded = filesUploaded.length == 3 ? true : false;

  //   });

  // }

  downloadFile(file) {
    if (file.url === '') {
      this.viewPdf("/assets/pdf/" + file.id_archivo + ".pdf");
    }

    if (file.url != '') {
      // const params = { "cod-solicitud": String(this.numSolicitud) }
      // return this.creditService.pagare(params)
      //   .subscribe(x => {
      //     console.log(x.data);
      //     this.viewPdf(x.data);
      //   })
    }
  }

  viewPdf(item) {
    // const modalRef: NgbModalRef = this.modalService.open(ModalPdf, { backdrop: 'static', centered: true, size: 'xl' });
    // modalRef.componentInstance.url_pdf = item;
  }

}

import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { listFile } from '../models/credits.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SigningService } from '../services/signing/signing.service';
import { ModalMessage } from '../pages/modals/message/modalMessage';
import { CreditsService } from '../services/credits/credits.service';
import { ModalPdf } from '../pages/modals/pdf/modalPdf';
import { runInThisContext } from 'vm';

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
  reconocer: boolean = false;
  notfound: boolean = false;
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
  auth;
  procesoConvenioGuid;
  token: any;
  iFrameContainer;
  iFrame: any;
  validacion;
  dataSigning: { cc: any; email: any; telefono: any; };

  constructor(
    private signingService: SigningService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private activateRouter: ActivatedRoute,
    private creditService: CreditsService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.iFrame = document.getElementById('iFrame');
    this.iFrameContainer = document.getElementById('iFrameContainer');
    this.auth = {
      clientId: "FINTRA",
      clientSecret: "F1ntr4P@$$w0rd"
    };
    this.validacion = {
      guidConv: "7aacec4f-2f02-4901-81f8-1d5772653434",
      tipoValidacion: "1",
      asesor: "Fintra",
      sede: "344889",
      tipoDoc: "CC",
      numDoc: "",
      email: "",
      celular: "",
      usuario: "Fintra",
      clave: "12345"
    }

    window.onmessage = async (event) => {
      if (event.data.for === "resultData") {
        // alert("Proceso terminado, Estado:" + event.data.isSuccess);
        this.iFrameContainer.classList.add('hide');
        this.iFrameContainer.classList.remove('show');
        if (event.data.isSuccess) {

          // this.queryDataCredit()
          await this.ConsultarValidacion("https://demorcs.olimpiait.com:6314/Validacion/ConsultarValidacion", this.token).then((resp: any) => {
            if (resp && resp.code == 200) {
              const data = resp.data;
              this.saveReconocerID(data)
              // --(finalizado = TRUE and EstadoProceso = (1: enrolamiento) and cacelado =false) // Paso las validaciones de identidad  
              // --(finalizado = TRUE and EstadoProceso = (2: validacion) and cancelado =false and aprobado=true  ) // Pasa cliente enrolados previamente
              if (data.finalizado == true && data.estadoProceso == 1 && data.cancelado == false) {
                this.stepSigning = 1;
                this.loadListFile();

              }
              if (data.finalizado == true && data.estadoProceso == 2 && data.cancelado == false && data.aprobado == true) {
                this.stepSigning = 1;
                this.loadListFile();
              }
              if (data.finalizado == true && (data.estadoProceso == 2 || data.estadoProceso == 1) && data.cancelado == false && data.aprobado == false) {
                // TODO la solicitud fue rechazada (la validación de reconocer no pasó los filtros)
                this.loadingRequest = false;
                // this.currentStep = 4;
                // this.currentSubStep = 3;
              }
            }
          });
        } else {
          this.saveReconocerID(event.data);
          this.loadingRequest = false;
        }
      }
    }

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
          this.stepSigning = 4;
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
          this.dataSigning = { cc: res.data.documento, email: res.data.email, telefono: res.data.celular }
          console.log(this.dataSigning);
          
          this.runValidation();
          this.phoneForm.patchValue({
            phone: res.data.celular
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

  async runValidation() {

    this.loadingRequest = true;
    this.validacion = { ...this.validacion, numDoc: this.dataSigning.cc, email: this.dataSigning.email, celular:  this.dataSigning.telefono}
    //this.validacion = {...this.validacion,  numDoc: "1143444600", email: "antoniojsh93@gmail.com" }
    // let token;
    let url;
    
    await this.Post("https://demorcs.olimpiait.com:6317/TraerToken", this.auth).then((resp: any) => {
      this.token = resp.accessToken;
    });
    //SOLICITAR VALIDACIÓN
    await this.Post("https://demorcs.olimpiait.com:6314/Validacion/SolicitudValidacion", this.validacion, this.token).then((resp: any) => {
      if (resp && resp.code == 200) {
        url = resp.data.url;
        this.procesoConvenioGuid = resp.data.procesoConvenioGuid
        this.loadingRequest = false;
      }
    })
      .catch(err => {
        this.loadingRequest = false;
      });
    if (url) {

      this.iFrame.src = url;
      this.iFrameContainer.classList.remove('hide');
      this.iFrameContainer.classList.add('show');
    }

  }

  Post(url, dataRequest, token = "") {
    return new Promise(function (resolve, reject) {
      var request = new XMLHttpRequest();
      request.open('POST', url);
      if (token !== "") {
        request.setRequestHeader("Authorization", "Bearer " + token);
      };
      request.setRequestHeader('Content-type', 'application/json');
      request.responseType = 'json';
      request.onload = function () {
        if (request.status === 200) {
          resolve(request.response);
        } else {
          reject(Error('No fue posible hacer la verificación:' + request.statusText));
        }
      };
      request.onerror = function () {
        reject(Error('Ocurrio un error de red.'));
      };
      // Send the request
      request.send(JSON.stringify(dataRequest));
    });
  }

  ConsultarValidacion(url, token = "") {


    let data = {
      "guidConv": "7aacec4f-2f02-4901-81f8-1d5772653434",
      "procesoConvenioGuid": this.procesoConvenioGuid,
      "usuario": "Fintra",
      "clave": "12345"
    }

    return new Promise(function (resolve, reject) {
      var request = new XMLHttpRequest();
      request.open('POST', url);
      if (token !== "") {
        request.setRequestHeader("Authorization", "Bearer " + token);
      };
      request.setRequestHeader('Content-type', 'application/json');
      request.responseType = 'json';
      request.onload = function () {
        if (request.status === 200) {
          resolve(request.response);
        } else {
          reject(Error('No fue posible hacer la verificación:' + request.statusText));
        }
      };
      request.onerror = function () {
        reject(Error('Ocurrio un error de red.'));
      };
      // Send the request
      request.send(JSON.stringify(data));
    });
  }

  saveReconocerID(data) {
    this.creditService.saveReconocerID('1079884493', data)
      .subscribe(data => {
        console.log('Saved reconocer ID');
      })
  }

}

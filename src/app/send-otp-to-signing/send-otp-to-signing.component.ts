import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { listFile } from '../models/credits.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SigningService } from '../services/signing/signing.service';
import { ModalMessage } from '../pages/modals/message/modalMessage';
import { CreditsService } from '../services/credits/credits.service';
import { ModalPdf } from '../pages/modals/pdf/modalPdf';
import { asyncScheduler, interval, Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { UtilsService } from '../services/utils/utils.service';

@Component({
  selector: 'app-send-otp-to-signing',
  templateUrl: './send-otp-to-signing.component.html',
  styleUrls: ['./send-otp-to-signing.component.scss']
})
export class SendOtpToSigningComponent implements OnInit {

  counter$: Observable<any>;

  phoneForm: FormGroup;
  documentsForm: FormGroup;
  keyForm: FormGroup;

  stepSigning: number = 0;
  seconds: number;
  isLoading: boolean = false;
  reconocer: boolean = false;
  notfound: boolean = false;
  showStep: boolean;
  loadingRequest: boolean = false;
  mDeceval: boolean = false;
  showTime: boolean = true;
  errors: boolean;
  signinFiles: any = [];
  numSolicitud: string;
  tipoUser: string;
  uniNegocio: number;
  main: string;
  textError: any;
  msjDeceval: any;
  auth;
  procesoConvenioGuid;
  token: any;
  iFrameContainer;
  iFrame: any;
  validacion;
  dataSigning: { cc: any; email: any; telefono: any; };
  isLoading2: boolean;
  messageLoading: string;
  aplicaValidacionEntidad: boolean;
  entidad: string;

  constructor(
    public utils: UtilsService,
    private signingService: SigningService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private activateRouter: ActivatedRoute,
    private creditService: CreditsService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.utils.getAplicaReconocer().subscribe(res => {
      if(res.status==200){
        if((res.data.aplica=="SI") &&(res.data.entidad=="RECONOSER")){
          this.aplicaValidacionEntidad=true;
          this.entidad="RECONOSER";
        }else{
          this.aplicaValidacionEntidad=false;
        }
      }
    })
    this.counter$ = interval(1000, asyncScheduler).pipe(
      map(
        x => 180 - x
      ),
      take(181)
    );
    this.iFrame = document.getElementById('iFrame');
    this.iFrameContainer = document.getElementById('iFrameContainer');
    this.auth = {
      clientId: "FINTRA",
      clientSecret: "Me@uB@!E44CQ%EAP"
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
      clave: "Fintra.2021*"
    }

    window.onmessage = async (event) => {
      if (event.data.for === "resultData") {
        // alert("Proceso terminado, Estado:" + event.data.isSuccess);
        this.iFrameContainer.classList.add('hide');
        this.iFrameContainer.classList.remove('show');
        if (event.data.isSuccess) {

          // this.queryDataCredit()
          await this.ConsultarValidacion("https://recidaw.olimpiait.com/Validacion/ConsultarValidacion", this.token).then((resp: any) => {
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
    this.messageLoading = 'Enviando mensaje...'
    this.isLoading = true;
    const params = {
      "num-celular": this.dataSigning.telefono
    }
    this.signingService.sendDinamicKey(params)
      .subscribe(res => {
        const modalRef: NgbModalRef = this.modalService.open(ModalMessage, { backdrop: 'static', centered: true });

        if (res.success) {
          res.data.body2="";
          modalRef.componentInstance.message = res.data;
        }
        modalRef.result.then(null, () => {
          this.stepSigning = 2;
          this.isLoading = false;
          this.countDown();
        });
      },
        err => {

        })
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

  goSigning() {
    if (!this.keyForm.valid) {
      return;
    }
    this.notfound = false;
    this.isLoading2 = true;
    const params = {
      "num-celular": this.dataSigning.telefono,
      "cod-otp": (this.keyForm.value.key).toString()
    }
    this.signingService.validateDinamicKey(params).subscribe(res => {
      this.isLoading2 = false;
      this.router.navigate([`signing/${this.numSolicitud}/${this.tipoUser}/${this.uniNegocio}`]);
    },
      err => {
        this.notfound = true;
        this.textError = err.error.data.detail;
        this.isLoading2 = false;
        
      })
      this.isLoading2 = false;
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
          if(this.aplicaValidacionEntidad){
            switch (this.entidad) {
              case 'RECONOSER':
                this.runValidation();
              break;
            
              default:
                this.loadListFile();
                this.loadingRequest = false;
                this.stepSigning = 1;
              break;
            }
          }else{
            this.loadListFile();
            this.loadingRequest = false;
            this.stepSigning = 1;
          }

         
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
    this.loadingRequest = true;
    const params: listFile = {
      option: 12,
      numero_solicitud: this.numSolicitud,
      user: 'API_FINTRA',
      und_negocio: this.uniNegocio
    };
    // documentos a firmar
    this.creditService.loadFileList(params).subscribe(list => {
      this.loadingRequest = false;
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
    this.messageLoading = 'Generando pagaré'
    this.isLoading = true;
    const params = { "cod-solicitud": String(this.numSolicitud) }
    return this.creditService.pagare(params)
      .subscribe(
        x => {
          this.viewPdf("*"+x.data.base64); 
          this.isLoading = false;
          this.mDeceval = false;
        },
        err => {
          this.isLoading = false;
          this.mDeceval = true;
          this.msjDeceval = 'Error comunicación DECEVAL.';
        })
  }

  viewPdf(item) {
    const modalRef: NgbModalRef = this.modalService.open(ModalPdf, { backdrop: 'static', centered: true, size: 'xl' });
    modalRef.componentInstance.url_pdf = item;
  }

  async runValidation() {

    this.loadingRequest = true;
    this.validacion = { ...this.validacion, numDoc: this.dataSigning.cc, email: this.dataSigning.email, celular: this.dataSigning.telefono }
    //this.validacion = {...this.validacion,  numDoc: "1143444600", email: "antoniojsh93@gmail.com" }
    // let token;
    let url;
    // debugger;
    await this.Post("https://recidaw.olimpiait.com/TraerToken", this.auth).then((resp: any) => {
      this.token = resp.accessToken;
    });
    //SOLICITAR VALIDACIÓN
    await this.Post("https://recidaw.olimpiait.com/Validacion/SolicitudValidacion", this.validacion, this.token).then((resp: any) => {
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
      "clave": "Fintra.2021*"
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
    // this.creditService.saveReconocerID('1079884493', data)
    //   .subscribe(data => {
    //     console.log('Saved reconocer ID');
    //   })
  }

}

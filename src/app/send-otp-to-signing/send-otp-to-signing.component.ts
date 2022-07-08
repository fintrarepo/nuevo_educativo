import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
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
import { AuthService } from '../services/auth/auth.service';
import Swal from 'sweetalert2';
import { ModalDelete } from '../pages/modals/delete/modalDelete';
import { BorrarComponent } from '../pages/modals/borrar/borrar.component';
import { HttpHeaders } from '@angular/common/http';

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
  acceptForm: FormGroup;
  tabFiles: number;
  politics: boolean;
  dataFile: any = {};

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
  listadoFiles: any = [];
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
  tipoSoli:string;

  //Variables del modal
  firmarActivado:number=0;
  listFiles: any = [];
  allFileUploaded: boolean;
  condNegocio: any;
  selectedFile: any = null;
  bloquearCampo:any=[];

  @ViewChild('documentos', { static: false }) modalValidacion: NgbModal;


  constructor(
    public utils: UtilsService,
    private signingService: SigningService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private activateRouter: ActivatedRoute,
    private creditService: CreditsService,
    private router: Router,
    private ats: AuthService
  ) { }

  ngOnInit() {
    this.politics = true;
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
      pagare_deceval: ['', Validators.requiredTrue]
    })
    this.acceptForm = this.fb.group({
      politica: ['', Validators.requiredTrue],
      clausula: ['', Validators.requiredTrue]
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

    //Aqui empieza para el modal
    this.activateRouter.params.subscribe(({ num, tipo, neg}) => {
      this.condNegocio = neg;
      this.numSolicitud = num;
      this.tipoSoli = tipo;
    })
    const negocio = this.activateRouter.snapshot.paramMap.get('num');
    console.log(this.ats)
    console.log(negocio)
    const params: listFile = {
      option: 16,
      numero_solicitud: negocio,
      user: 'API_FINTRA',
      und_negocio: 31
    };
    this.creditService.loadFileList(params).subscribe(list => {
      console.log(list)
      this.listadoFiles = list.data;
      const filesUploaded = this.listFiles.filter(x => x.url != '')
      this.allFileUploaded = filesUploaded.length == 3 ? true : false;
      // this.bloquearCampo=[];
      for (let i = 0; i < this.listadoFiles.length; i++) {
        this.bloquearCampo.push(false);
      }
    });

  }

  aceptarPolitica(){
    this.politics = false;
        this.modalService.open(this.modalValidacion, { backdrop: 'static', centered: true }).result.then((result) => {
          this.tabFiles =2;
          console.log(result);
          }, (reason) => {});
    const negocio = this.activateRouter.snapshot.paramMap.get('num');
    const params = {
      numero_solicitud: parseInt(negocio),
      tipo: 1,
      politica: "S",
      clausula: "S"
    };
    console.log(params)
    this.creditService.aceptarPolitica(params).subscribe(info => {
      console.log(info)
      if (info.status == 200) {
        Swal.fire(
          'Informacion',
          'Aceptados los terminos',
          'success'
        )
        this.modalService.open(this.modalValidacion, { backdrop: 'static', centered: true }).result.then((result) => {
          this.tabFiles =2;
          console.log(result);
          }, (reason) => {});
      }else{
        Swal.fire(
          'Informacion',
          info.error.data,
          'question'
        )
      }
    },
    err => {
      console.log(err);
    });
  }

  viewFile(item) {
    if (item==1) {
      this.viewPdf("/assets/pdf/politica.pdf");
    } else {
      this.viewPdf("/assets/pdf/clausula.pdf");
    }
  }

  //Metodos del modal
  onFileSelected(obj: any, input: any,index:number) {
    let options: any;
    if (input.target.files && input.target.files.length > 0) {
      this.selectedFile = input.target.files[0];
      obj['file_name'] = this.selectedFile.name;
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);
      options = {
        headers: new HttpHeaders({
          'id_file': String(obj.id_archivo),
          'negocio': String(this.activateRouter.snapshot.paramMap.get('id'))
        })
      };
      this.creditService.upload(formData, options).subscribe(info => {
        console.log(info)
        console.log(formData)
        console.log(this.selectedFile, this.selectedFile.name)
        if (info.success) {
          this.bloquearCampo[index].false;
          this.firmarActivado+=1;
          const ind=this.listadoFiles.findIndex(element => element ==obj);
          console.log(ind);
          this.listadoFiles[ind].bloquear=true;
        }else{
          Swal.fire(
            'Informacion',
            info.error.data,
            'question'
          )
        }
      },
      err => {
        console.log(err);
      });
    }
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  openModal(item) {
    const modalRef: NgbModalRef = this.modalService.open(BorrarComponent, { backdrop: 'static', centered: true });
    modalRef.componentInstance.document = item;
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      this.deleteFile(receivedEntry,item);
    })
  }

  deleteFile(list,item) {
    Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading(); }, }).then((result) => { });
    const params: listFile = {
      option: 4,
      numero_solicitud: this.activateRouter.snapshot.paramMap.get('id'),
      user: this.auth.id_usuario,
      und_negocio: 31,
      id_archivo: list.id_archivo
    };
    this.creditService.deleteFile(params).subscribe(list => {
      Swal.close();
      this.firmarActivado-=1;
      const ind=this.listadoFiles.findIndex(element => element ==item);
          console.log(ind);
          this.listadoFiles[ind].bloquear=false;
          console.log(this.listadoFiles[ind].bloquear)
    });
  }
  // Aqui se terminan los metodos del modal.

  nextTap(tap) {
    // this.creditService.commercialFollowUp({"cod-solicitud":this.numSolicitud,"tipo":"E"}).subscribe(resp => console.log(resp))
    // this.tabFiles = tap;
    // if(this.tabFiles==2){
    //   this.modalService.open(this.modalValidacion, { backdrop: 'static', centered: true }).result.then((result) => {
    //     this.tabFiles =2;
    //     console.log(result);
    //     }, (reason) => {});
    // }
    // this.modalService.open(this.modalValidacion, { backdrop: 'static', keyboard: false, ariaLabelledBy: 'modal-basic-title', size: 'lg' });
  }


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.main = window.innerHeight + 'px';
  }

  sendSms() {
    this.messageLoading = 'Enviando mensaje...'
    this.isLoading = true;
    const params = {
      "num-celular": this.dataSigning.telefono,
      "documento": this.dataSigning.cc 
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
    console.log(params)
    this.creditService.loadFileList(params).subscribe(list => {
      this.loadingRequest = false;
      this.signinFiles = list.data;
      console.log(this.signinFiles)
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
    const negocio = this.activateRouter.snapshot.paramMap.get('num');
    const params = { "cod-solicitud": negocio }
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

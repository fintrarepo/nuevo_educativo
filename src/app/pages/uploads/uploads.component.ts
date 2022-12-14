import { Component, OnInit, ɵConsole } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreditsService } from '../../services/credits/credits.service';
import { listFile } from '../../models/credits.model';
// import { promise } from 'protractor';
// import { resolve, reject } from 'q';
import { HttpHeaders, HttpEventType } from '@angular/common/http';
import { AuthService } from '../../services/auth/auth.service'

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalDelete } from '../modals/delete/modalDelete';
import { filter } from 'rxjs/operators';
import { ModalPdf } from '../modals/pdf/modalPdf';
import { Store } from '@ngrx/store';

import * as reducers from '../../reducers/reducers';
import { OpenAlert } from 'src/app/actions/alert.actions';
import { FirmDocumentsComponent } from 'src/app/components/firmDocuments/firmDocuments.component';
@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.scss']
})
export class UploadsComponent implements OnInit {
  attached: boolean;
  selectedFile: any = null;
  listFiles: any = [];
  signinFiles: any = [];
  public adj = 'Adjuntar';
  public adt = 'Adjuntado';
  path = '/assets/images/Icon_Adjuntar ';
  pathD = '/assets/images/Icon_Adjuntar_green ';
  isLoading: boolean = false;
  mDeceval: boolean = false;
  tabFiles: number;
  documentsForm: FormGroup;
  allFileUploaded: boolean = false;
  condNegocio: string;
  numSolicitud: any;
  msjDeceval: string;
  tamanoRequerido:number = 0;
  envioRequerido: number = 0;
  envioId: string;

  constructor(
    private creditService: CreditsService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private activateRouter: ActivatedRoute,
    private modalService: NgbModal,
    private store: Store<reducers.State>,
    // public dialog: MatDialog,
  ) {
    this.documentsForm = this.formBuilder.group({
      pagare_deceval: ['', Validators.requiredTrue],
      otros_soportes_1_titular: ['', ],
      seguro_titular: ['', ],
      terminos_y_condiciones: ['', []],
      fianza_titular: ['', []]
    });
    this.activateRouter.params.subscribe(({ id, sol }) => {
      this.condNegocio = id;
      this.numSolicitud = sol;
    })
  }

  ngOnInit() {
    // const modalRef: NgbModalRef = this.modalService.open(FirmDocumentsComponent, { backdrop: 'static', centered: true });
    
    this.loadListFile();
    this.tabFiles = 1;
    this.documentsForm.get('pagare_deceval').valueChanges.subscribe(validate => {
      if (validate) {
        this.verPagare();
      }
    });
  }

  loadListFile() {
    this.isLoading = true;
    const negocio = this.route.snapshot.paramMap.get('id');
    const params: listFile = {
      option: 10,
      numero_solicitud: negocio,
      user: this.auth.id_usuario,
      und_negocio: 31
    };
    // documentos a firmar
    this.creditService.loadFileList(params).subscribe(list => {
      console.log(params)
      this.isLoading = false;
      this.signinFiles = list.data;
      const filesUploaded = this.listFiles.filter(x => x.url != '')
      this.allFileUploaded = filesUploaded.length == 3 ? true : false;

    });

    const params2: listFile = {
      option: 11,
      numero_solicitud: negocio,
      user: this.auth.id_usuario,
      und_negocio: 31
    };
    // documentos a subir
    this.tamanoRequerido = 0;
    this.envioRequerido = 0;
    console.log('Empezamos: ', this.envioRequerido)
    this.creditService.loadFileList(params2).subscribe(list => {
      this.isLoading = false;
      this.listFiles = list.data;
      console.log(this.listFiles);
      const filesUploaded = this.listFiles.filter(x => x.url != '')
      this.allFileUploaded = filesUploaded.length == 5 ? true : false;
      // this.tamanoRequerido = 2;
      // console.log(this.tamanoRequerido)
      for (let i = 0; i < this.listFiles.length; i++) {
        if (this.listFiles[i].requerido=='S') {
          this.tamanoRequerido= this.tamanoRequerido+1;

          if (this.listFiles[i].archivo_cargado!='N') {
            this.envioRequerido=this.envioRequerido+1;
            console.log('Aqui estoy: ', this.envioRequerido)
          }
        }
      }
      console.log('Requerido ', this.tamanoRequerido)
      console.log('Requerido: ', this.tamanoRequerido, ' vs Envio:', this.envioRequerido);
    });
    

  }

  openModal(item) {
    const modalRef: NgbModalRef = this.modalService.open(ModalDelete, { backdrop: 'static', centered: true });
    modalRef.componentInstance.document = item;
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      this.deleteFile(receivedEntry);
    })
  }

  viewPdf(item) {
    const modalRef: NgbModalRef = this.modalService.open(ModalPdf, { backdrop: 'static', centered: true, size: 'xl' });
    modalRef.componentInstance.url_pdf = item;
  }

  deleteFile(list) {
    this.isLoading = true;
    const params: listFile = {
      option: 4,
      numero_solicitud: this.route.snapshot.paramMap.get('id'),
      user: this.auth.id_usuario,
      und_negocio: 31,
      id_archivo: list.id_archivo
    };
    if (list.requerido=='S') {
      this.envioRequerido-=1;
      console.log('Requerido: ', this.tamanoRequerido, ' vs Envio:', this.envioRequerido);
    }
    console.log(this.envioRequerido)
    this.creditService.deleteFile(params).subscribe(info => {
      this.isLoading = false;
      this.loadListFile();
    });
  }

  onFileSelected(obj: any, input: any) {
    console.log(this.tamanoRequerido)
    let options: any;
    if (input.target.files && input.target.files.length > 0) {
      this.selectedFile = input.target.files[0];
      obj['file_name'] = this.selectedFile.name;
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);
      options = {
        headers: new HttpHeaders({
          'token': String(localStorage.getItem('token')),
          'id_file': String(obj.id_archivo),
          'negocio': String(this.route.snapshot.paramMap.get('id'))
        })
      };
      console.log(obj)
      console.log(this.selectedFile, this.selectedFile.name)
      console.log(options)
      this.creditService.uploadImage(formData, options).subscribe(info => {
        if (info.success) {
          if (obj.requerido=='S' && obj.archivo_cargado=='N') {
            this.envioRequerido+=1;
            console.log('Requerido: ', this.tamanoRequerido, ' vs Envio:', this.envioRequerido);
          }
          this.loadListFile();
        }
      },
      err => {
        console.log(err);
        
      });
    }
  }

  showDownload(file) {
    return (file.id_archivo == 159 || file.id_archivo == 161 || file.id_archivo == 162 || file.id_archivo == 167 || file.id_archivo == 158)
  }

  downloadFile(file) {
    if (file.url === '') {
      // return this.download(file.id_archivo);
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
          this.viewPdf("*"+x.data.base64);

          this.isLoading = false;
          this.mDeceval = false;
        },
        err => {
          this.isLoading = false;
          this.mDeceval = true;
          this.msjDeceval = 'Error comunicación DECEVAL.'
          return this.store.dispatch(new OpenAlert({
            open: true,
            title: "Error",
            subTitle: "Ha habido un error en la comunicación con DECEVAL.",
            type: "danger"
          }))
        })
  }


  download(text) {
   
    window.open(encodeURIComponent("/assets/pdf/" + text + ".pdf"))
  }


  save() {
    this.router.navigate(['/app/dashboard/requests?referidos=true'])
  }

  goSigning() {

    // const modalRef: NgbModalRef = this.modalService.open(FirmDocumentsComponent, { backdrop: 'static', centered: true });

       
    // alert("hola");
    this.isLoading = true;

    this.creditService.sendOtp().subscribe((response) => {
      this.creditService.addMessage(response);
      // this.isLoading = false;
      this.router.navigate([`/app/signing/${this.condNegocio}/${this.numSolicitud}`])
    })
  }

  access() {
    if (this.listFiles.length > 0) {
      let longitud = this.listFiles.filter(doc => doc.archivo_cargado === 'N');

      return longitud.length;
    }

    return this.listFiles.length;
  }

  nextTap(tap) {
    const params = {
      "cod-negocio": this.activateRouter.snapshot.paramMap.get('id'),
    };
    this.creditService.etapaDocu(params).subscribe(info => {
      console.log(info)
      if (info.status == 200) {
        console.log('Se envio con exito, ', this.envioId)
      }
    },
    err => {
      console.log(err);
    });

    this.tabFiles = tap;
    if(this.tabFiles==2){
     this.modalService.open(FirmDocumentsComponent, { backdrop: 'static', centered: true }).result.then((result) => {
      this.tabFiles =2;
      }, (reason) => {
        
      });
    }
  }
}

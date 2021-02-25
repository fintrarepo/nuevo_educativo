import { Component, OnInit, ɵConsole } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreditsService } from '../../services/credits/credits.service';
import { listFile } from '../../models/credits.model';
import { promise } from 'protractor';
import { resolve, reject } from 'q';
import { HttpHeaders, HttpEventType } from '@angular/common/http';
import { AuthService } from '../../services/auth/auth.service'

import { Store } from '@ngrx/store';
import * as reducers from '../../reducers/reducers';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalDelete } from '../modals/delete/modalDelete';
import { filter } from 'rxjs/operators';
import { ModalPdf } from '../modals/pdf/modalPdf';

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
  isLoading: boolean = true;
  tabFiles: number;
  documentsForm: FormGroup;
  allFileUploaded: boolean = false;
  condNegocio: string;
  listRequest$ = this.store.select(reducers.getListRequestResponse);
  numSolicitud: any;

  constructor(
    private creditService: CreditsService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private store: Store<reducers.State>,
    private formBuilder: FormBuilder,
    private activateRouter: ActivatedRoute,
    private modalService: NgbModal
  ) {
    this.documentsForm = this.formBuilder.group({
      plan_de_pago: ['', Validators.requiredTrue],
      otros_soportes_1_titular: ['', Validators.requiredTrue],
      seguro_titular: ['', Validators.requiredTrue],
      terminos_y_condiciones: ['', [Validators.requiredTrue]],
      fianza_titular: ['', [Validators.requiredTrue]]
    });
    this.activateRouter.params.subscribe(({ id }) => {
      this.condNegocio = id;
    })
  }

  ngOnInit() {
    this.loadListFile();
    this.getDateRequest()
    this.tabFiles = 2;
  }

  getDateRequest() {
    this.listRequest$.subscribe(data => {
      if (data) {
        this.numSolicitud = data[0]['numero_solicitud'];
      }
    })
  }

  loadListFile() {
    const params: listFile = {
      option: 2,
      numero_solicitud: this.route.snapshot.paramMap.get('id'),
      user: this.auth.id_usuario,
      und_negocio: 31
    };
    this.creditService.loadFileList(params).subscribe(list => {
      this.isLoading = false;
      const allFiles = list.data.filter(x => x.visible === 'S');
      this.signinFiles = allFiles.filter(x => (x.id_archivo == 159 || x.id_archivo == 161 || x.id_archivo == 162 || x.id_archivo == 167 || x.id_archivo == 158))
      this.listFiles = allFiles.filter(x => (x.id_archivo == 150 || x.id_archivo == 151 || x.id_archivo == 415 || x.id_archivo == 416 || x.id_archivo == 160))


      const filesUploaded = this.listFiles.filter(x => x.url != '')
      this.allFileUploaded = filesUploaded.length == 3 ? true : false;

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
    this.creditService.deleteFile(params).subscribe(list => {
      this.isLoading = false;
      this.loadListFile();
    });
  }

  onFileSelected(obj: any, input: any) {
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

      this.creditService.uploadImage(formData, options).subscribe(info => {
        if (info.success) {
          this.loadListFile();
        }


      });

    }
  }

  showDownload(file) {
    return (file.id_archivo == 159 || file.id_archivo == 161 || file.id_archivo == 162 || file.id_archivo == 167 || file.id_archivo == 158)
  }

  downloadFile(file) {
    if (file.id_archivo == 159 || file.id_archivo == 161 || file.id_archivo == 162 || file.id_archivo == 167) {
      // return this.download(file.id_archivo);
      this.viewPdf("/assets/pdf/" + file.id_archivo + ".pdf");
    }

    if (file.id_archivo == 158) {
      // return this.creditService.planDePagos(String(this.route.snapshot.paramMap.get('id')))
      return this.creditService.planDePagos(String(this.numSolicitud))
        .subscribe(x => {

          // window.open(encodeURIComponent(x.data));
          window.open(x.data);
        })
    }
  }


  download(text) {
    window.open(encodeURIComponent("/assets/pdf/" + text + ".pdf"))
  }


  save() {
    this.router.navigate(['/app/dashboard/requests?referidos=true'])
  }

  goSigning() {
    this.isLoading = true;

    this.creditService.sendOtp().subscribe((response) => {
      this.creditService.addMessage(response);
      this.isLoading = false;
      this.router.navigate(['/app/signing', this.condNegocio])
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
    this.tabFiles = tap;
  }
  // get planpago() {
  //   return this.documentsForm.get('plan_de_pago');
  // }
  // get asesoria() {
  //   return this.documentsForm.get('otros_soportes_1_titular');
  // }
  // get poliza() {
  //   return this.documentsForm.get('seguro_titular');
  // }
  // get terminos() {
  //   return this.documentsForm.get('terminos_y_condiciones');
  // }
  // get aval() {
  //   return this.documentsForm.get('fianza_titular');
  // }
}

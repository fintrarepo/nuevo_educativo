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
  numSolicitud: any;

  constructor(
    private creditService: CreditsService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private activateRouter: ActivatedRoute,
    private modalService: NgbModal
  ) {
    this.documentsForm = this.formBuilder.group({
      pagare_deceval: ['', Validators.requiredTrue],
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
    this.numSolicitud = this.route.snapshot.paramMap.get('sol')
    this.loadListFile();
    this.tabFiles = 2;
  }

  loadListFile() {
    const negocio = this.route.snapshot.paramMap.get('id');
    const params: listFile = {
      option: 10,
      numero_solicitud: negocio,
      user: this.auth.id_usuario,
      und_negocio: 31
    };
    // documentos a firmar
    this.creditService.loadFileList(params).subscribe(list => {
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
    this.creditService.loadFileList(params2).subscribe(list => {
      this.isLoading = false;
      this.listFiles = list.data
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
    if (file.url === '') {
      // return this.download(file.id_archivo);
      this.viewPdf("/assets/pdf/" + file.id_archivo + ".pdf");
    }

    if (file.url != '') {
      // return this.creditService.planDePagos(String(this.route.snapshot.paramMap.get('id')))
      const params = { "cod-solicitud": String(this.numSolicitud) }
      return this.creditService.pagare(params)
        .subscribe(x => {
          console.log(x.data);
          this.viewPdf(x.data);
          // window.open(encodeURIComponent(x.data));
          // window.open(x.data);
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
}

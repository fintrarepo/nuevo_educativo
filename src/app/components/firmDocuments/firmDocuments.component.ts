import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { listFile } from 'src/app/models/credits.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CreditsService } from 'src/app/services/credits/credits.service';
import { Store } from '@ngrx/store';
import * as reducers from '../../reducers/reducers';
import { OpenAlert } from 'src/app/actions/alert.actions';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalPdf } from 'src/app/pages/modals/pdf/modalPdf';
import { HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ModalDelete } from 'src/app/pages/modals/delete/modalDelete';
@Component({
  selector: 'app-firmDocuments',
  templateUrl: './firmDocuments.component.html',
  styleUrls: ['./firmDocuments.component.scss']
})
export class FirmDocumentsComponent implements OnInit {

  firmarActivado:number=0;
  listFiles: any = [];
  signinFiles: any = [];
  allFileUploaded: boolean;
  msjDeceval: string;
  condNegocio: any;
  numSolicitud: any;
  selectedFile: any = null;
  bloquearCampo:any=[];
  tamanoRequerido:number = 0;
  envioRequerido: number = 0;

  constructor( 
    private creditService: CreditsService,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    private activateRouter: ActivatedRoute,
    private modalService: NgbModal,
    private store: Store<reducers.State>,
    private activeModal: NgbActiveModal
    ) { }

  ngOnInit() {
    this.activateRouter.params.subscribe(({ id, sol }) => {
      this.condNegocio = id;
      this.numSolicitud = sol;
    })
    const negocio = this.route.snapshot.paramMap.get('id');
    const params: listFile = {
      option: 15,
      numero_solicitud: negocio,
      user: this.auth.id_usuario,
      und_negocio: 31
    };
    this.creditService.loadFileList(params).subscribe(list => {
      this.signinFiles = list.data;
      console.log(  this.signinFiles)
      const filesUploaded = this.listFiles.filter(x => x.url != '')
      this.allFileUploaded = filesUploaded.length == 3 ? true : false;
      // this.bloquearCampo=[];
      for (let i = 0; i < this.signinFiles.length; i++) {
        if (this.signinFiles[i].requerido=='S') {
          this.tamanoRequerido = this.tamanoRequerido+1;
        }
        this.bloquearCampo.push(false);
      }
    });
  }


  downloadFile(file) {
    if (file.url === '') {
      // return this.download(file.id_archivo);
      this.viewPdf("/assets/pdf/" + file.id_archivo + ".pdf");
    }
  }

  closeModal() {
    this.activeModal.dismiss();
  }

  viewPdf(item) {
    const modalRef: NgbModalRef = this.modalService.open(ModalPdf, { backdrop: 'static', centered: true, size: 'xl' });
    modalRef.componentInstance.url_pdf = item;
  }

  onFileSelected(obj: any, input: any,index:number) {
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
        // debugger;
        if (info.success) {
          this.bloquearCampo[index].false;
          this.firmarActivado+=1;
          if (obj.requerido=='S') {
            this.envioRequerido+=1;
          }
          const ind=this.signinFiles.findIndex(element => element ==obj);
          console.log(ind);
          this.signinFiles[ind].bloquear=true;
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
  openModal(item) {
    const modalRef: NgbModalRef = this.modalService.open(ModalDelete, { backdrop: 'static', centered: true });
    modalRef.componentInstance.document = item;
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      this.deleteFile(receivedEntry,item);
    })
  }

  
  deleteFile(list,item) {
    Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading(); }, }).then((result) => { });
    const params: listFile = {
      option: 4,
      numero_solicitud: this.route.snapshot.paramMap.get('id'),
      user: this.auth.id_usuario,
      und_negocio: 31,
      id_archivo: list.id_archivo
    };
    if (list.requerido=='S') {
      this.envioRequerido-=1;
    }
    this.creditService.deleteFile(params).subscribe(list => {
      Swal.close();
      this.firmarActivado-=1;
      const ind=this.signinFiles.findIndex(element => element ==item);
          console.log(ind);
          this.signinFiles[ind].bloquear=false;
    });
  }
}

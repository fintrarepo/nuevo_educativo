import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { listFile } from 'src/app/models/credits.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CreditsService } from 'src/app/services/credits/credits.service';
import { Store } from '@ngrx/store';
import * as reducers from '../../reducers/reducers';
import { OpenAlert } from 'src/app/actions/alert.actions';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalPdf } from 'src/app/pages/modals/pdf/modalPdf';
@Component({
  selector: 'app-firmDocuments',
  templateUrl: './firmDocuments.component.html',
  styleUrls: ['./firmDocuments.component.scss']
})
export class FirmDocumentsComponent implements OnInit {


  listFiles: any = [];
  signinFiles: any = [];
  allFileUploaded: boolean;
  msjDeceval: string;
  condNegocio: any;
  numSolicitud: any;

  constructor( 
    private creditService: CreditsService,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    private activateRouter: ActivatedRoute,
    private modalService: NgbModal,
    private store: Store<reducers.State>,
    ) { }

  ngOnInit() {
    this.activateRouter.params.subscribe(({ id, sol }) => {
      this.condNegocio = id;
      this.numSolicitud = sol;
    })
    const negocio = this.route.snapshot.paramMap.get('id');
    const params: listFile = {
      option: 10,
      numero_solicitud: negocio,
      user: this.auth.id_usuario,
      und_negocio: 31
    };
    this.creditService.loadFileList(params).subscribe(list => {
      this.signinFiles = list.data;
      console.log(  this.signinFiles)
      const filesUploaded = this.listFiles.filter(x => x.url != '')
      this.allFileUploaded = filesUploaded.length == 3 ? true : false;
    });
  }

  downloadFile(file) {
    if (file.url === '') {
      // return this.download(file.id_archivo);
      // this.viewPdf("/assets/pdf/" + file.id_archivo + ".pdf");
      let link = document.createElement('a');
      link.href = "/assets/pdf/" + file.nombre_archivo + ".pdf";
      link.download = `${file.id_archivo}.pdf`;
      link.dispatchEvent(new MouseEvent('click'));
    }

    if (file.url != '') {
      this.verPagare();
    }
  }

  verPagare() {

   
    const params = { "cod-solicitud": String(this.numSolicitud) }
    return this.creditService.pagare(params)
      .subscribe(
        x => {
          this.viewPdf("*"+x.data.base64);
        },
        err => {
        
          this.msjDeceval = 'Error comunicación DECEVAL.'
          return this.store.dispatch(new OpenAlert({
            open: true,
            title: "Error",
            subTitle: "Ha habido un error en la comunicación con DECEVAL.",
            type: "danger"
          }))
        })
  }

  viewPdf(item) {
    const modalRef: NgbModalRef = this.modalService.open(ModalPdf, { backdrop: 'static', centered: true, size: 'xl' });
    modalRef.componentInstance.url_pdf = item;
  }
}

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

@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.scss']
})
export class UploadsComponent implements OnInit {
  attached: boolean;
  selectedFile: any = null;
  listFiles: any = [];
  public adj = 'Adjuntar';
  public adt = 'Adjuntado';
  path = '/assets/images/Icon_Adjuntar ';
  isLoading: boolean = true;

  allFileUploaded: boolean = false;

  listRequest$ = this.store.select(reducers.getListRequestResponse);
  numSolicitud: any;

  constructor(private creditService: CreditsService, private route: ActivatedRoute, private router: Router, private auth: AuthService, private store: Store<reducers.State>) { }

  ngOnInit() {
    this.loadListFile();
    this.getDateRequest()
  }

  getDateRequest() {
    this.listRequest$.subscribe(data => {
      console.log(data);
      this.numSolicitud = data[0].numero_solicitud;

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
      this.listFiles = list.data.filter(x => x.visible === 'S');

      const filesUploaded = this.listFiles.filter(x => x.url != '')
      this.allFileUploaded = filesUploaded.length == 3 ? true : false;

    });
  }

  onFileSelected(obj: any, input: any) {
    console.log("uploading file: ");
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
        console.log(info);
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
    console.log(file.id_archivo)
    if (file.id_archivo == 159 || file.id_archivo == 161 || file.id_archivo == 162 || file.id_archivo == 167) {
      return this.download(file.id_archivo);
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
}

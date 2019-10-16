import { Component, OnInit, ɵConsole } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreditsService } from '../../services/credits/credits.service';
import { listFile } from '../../models/credits.model';
import { promise } from 'protractor';
import { resolve, reject } from 'q';
import { HttpHeaders, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.scss']
})
export class UploadsComponent implements OnInit {
  attached: boolean;
  selectedFile: any = null;
  listFiles: any = [];
  path = '/assets/images/Icon_Adjuntar ';
  constructor(private creditService: CreditsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadListFile();
  }

  loadListFile() {
    const params: listFile = {
      option: 2,
      numero_solicitud: this.route.snapshot.paramMap.get('id'),
      user: 'MAURICIOJZB@GMAIL.COM',
      und_negocio: 31
    };
    this.creditService.loadFileList(params).subscribe(list => {
      this.listFiles = list.data.filter(x => x.visible === 'S');
    });
  }

  onFileSelected(obj: any, input: any) {
    console.log("uploading file: ");
    let options: any;
    if (input.target.files && input.target.files.length > 0) {
      this.selectedFile = input.target.files[0];
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
        if(info.success){
          this.loadListFile();
        }
          
        
      });

    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-update-info',
  templateUrl: './update-info.component.html',
  styleUrls: ['./update-info.component.scss']
})
export class UpdateInfoComponent implements OnInit {

  form: FormGroup;

  constructor(public formBuilder: FormBuilder) {

    this.form = formBuilder.group({
      "coddpto": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "nomcli": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "nit": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "direccion": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "telcontacto": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "email": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "ciudad": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      "barrio": ['', Validators.compose([Validators.maxLength(50), Validators.required])],
    })
  }

  ngOnInit() {
  }

}

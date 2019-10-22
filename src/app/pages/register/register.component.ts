import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CreditsService } from "../../services/credits/credits.service";
import { OpenAlert } from 'src/app/actions/alert.actions';
import { Store } from '@ngrx/store';
import * as reducers from '../../reducers/reducers';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  passConfirm = false;

  constructor (private store: Store<reducers.State>, public formBuilder: FormBuilder, private credServ: CreditsService, private route: Router) {
    this.registerForm = this.formBuilder.group({
      'tipo_identificacion': ['', Validators.compose([Validators.required])],
      'identificacion': ['', Validators.compose([Validators.required, Validators.maxLength(10)])],
      'fecha_expedicion': ['', Validators.compose([Validators.required])],
      // 'ciudad': ['', Validators.compose([Validators.required])],
      'primer_nombre': ['', Validators.compose([Validators.required])],
      'primer_apellido': ['', Validators.compose([Validators.required])],
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'password1': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      'password2': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    });
  }

  ngOnInit () {
  }

  register (ev) {
    ev.preventDefault();

    if (!this.registerForm.invalid) {
      if (this.registerForm.controls.password1.value === this.registerForm.controls.password2.value) {
        this.passConfirm = false;
        // console.log(this.registerForm);
        this.credServ.registerUser(this.registerForm.value).subscribe((resp) => {
          if (resp.data == 'OK'){
            this.store.dispatch(new OpenAlert({
              open: true,
              title: "Felicidades",
              subTitle: "Tus datos fueron registrados.!",
              type: "success"
            }))
          }
          this.registerForm.reset();
          // else{
          //   this.store.dispatch(new OpenAlert({
          //     open: true,
          //     title: "Upps",
          //     subTitle: "Ya se encuentran registrados los datos, ve al login!",
          //     type: "success"
          //   }));
          // }
          //TOdo Ok
        }, (error) => {
          console.log(error);
          this.store.dispatch(new OpenAlert({
            open: true,
            title: "Error",
            subTitle: error.error.detail,
            type: "danger"
          }));
        });
        // alert('Registrando usuario....!');
      } else {
        // alert('clave invalida ....!');
        this.passConfirm = true;
      }
    } else {
      // alert('No pudimos enviar tus datos, llena la informacion....!');
      this.store.dispatch(new OpenAlert({
        open: true,
        title: "",
        subTitle: "Debes llenar el formulario",
        type: "warning"
      }))
    }


    // if(this.registerForm.invalid){
    //   console.log(this.registerForm);
    // }else{
    //   console.log(this.registerForm.value.identificacion);
    // }    

  }

}

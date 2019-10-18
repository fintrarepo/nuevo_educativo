import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validator, FormGroup } from "@angular/forms";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(public formBuilder: FormBuilder) { 
    this.registerForm = formBuilder.group({

    });
  }

  ngOnInit() {
  }

}

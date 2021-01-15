import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as reducers from '../../reducers/reducers';
import { Store } from '@ngrx/store';
import { CreditsService } from '../../services/credits/credits.service';

@Component({
  selector: 'app-signing',
  templateUrl: './signing.component.html',
  styleUrls: ['./signing.component.scss']
})
export class SigningComponent implements OnInit {
  listRequest$ = this.store.select(reducers.getListRequestResponse);

  tapSigning: number;
  otpForm: FormGroup;
  inforequest: any;
  notfound: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store<reducers.State>,
    private creditService: CreditsService
  ) {
    this.tapSigning = 1;
    this.notfound = false;
    this.otpForm = this.formBuilder.group({
      otp: ['', Validators.required]
    });
  }
  
  ngOnInit() {
    this.listRequest$.subscribe(data => {
      this.inforequest = data;
    })
  }
  validarOtp() {
    if (this.otpForm.valid) {
      this.notfound = false;
      this.creditService.validateOtp({'cod-otp':this.otpForm.value.otp}).subscribe(data => {
        console.log(data.detail)
      }, err => {
        this.notfound = true;
        console.log(err.error.detail);
      })
    }

  }

  nextTap(tap: number) {
    this.tapSigning = tap;
  }

  backUpdate() {
    this.router.navigate(['/app/upload/', this.inforequest.cod_neg])
  }

  get code() {
    return this.otpForm.get('otp');
  }

}

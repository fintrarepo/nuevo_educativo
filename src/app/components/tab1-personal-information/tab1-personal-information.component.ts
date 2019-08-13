import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as reducers from '../../reducers/reducers';
import { OpenForm, ClosedForm } from '../../actions/address-form.actions';
import { FormBuilder, Validators, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-tab1-personal-information',
  templateUrl: './tab1-personal-information.component.html',
  styleUrls: ['./tab1-personal-information.component.scss']
})
export class Tab1PersonalInformationComponent implements OnInit {
  form: FormGroup;
  tab1;
  constructor(private store: Store<reducers.State>,public formBuilder: FormBuilder) {
    this.form = formBuilder.group({

    })
   }

  ngOnInit() {
  }


  openForm() {
    this.store.dispatch(new OpenForm())
  }

  closeForm() {
    this.store.dispatch(new ClosedForm())
  }
}

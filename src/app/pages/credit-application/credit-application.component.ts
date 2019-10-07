import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as reducers from '../../reducers/reducers';
import { InfoFormRequest } from '../../actions/platform.actions';

@Component({
  selector: 'app-credit-application',
  templateUrl: './credit-application.component.html',
  styleUrls: ['./credit-application.component.scss']
})
export class CreditApplicationComponent implements OnInit {

  constructor(private store: Store<reducers.State>) { }

  ngOnInit() {
    this.store.dispatch(new InfoFormRequest());
  }

}

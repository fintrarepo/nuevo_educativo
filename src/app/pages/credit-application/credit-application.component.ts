import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as reducers from '../../reducers/reducers';
import { InfoFormRequest, SetCurrentBussinees } from '../../actions/platform.actions';

@Component({
  selector: 'app-credit-application',
  templateUrl: './credit-application.component.html',
  styleUrls: ['./credit-application.component.scss']
})
export class CreditApplicationComponent implements OnInit, OnDestroy {

  constructor(private store: Store<reducers.State>) { }

  ngOnInit() {
    this.store.dispatch(new InfoFormRequest());
  }

  ngOnDestroy() {
    this.store.dispatch(new SetCurrentBussinees(null))
  }

}

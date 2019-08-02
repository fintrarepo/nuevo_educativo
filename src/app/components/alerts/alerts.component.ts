import { Component, OnInit } from '@angular/core';
import * as reducers from '../../reducers/reducers';
import { Store } from '@ngrx/store';
import { getAlertType, getAlertTitle, getAlertSubTitle } from '../../reducers/reducers';
import { ClosedAlert } from '../../actions/alert.actions';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {

  type$ = this.store.select(reducers.getAlertType);
  title$ = this.store.select(reducers.getAlertTitle);
  subTitle$ = this.store.select(reducers.getAlertSubTitle);
  open$ = this.store.select(reducers.getAlertOpen);

  constructor(private store: Store<reducers.State>) { }

  ngOnInit() {
    this.open$.subscribe(isOpen => {
      if (isOpen) {
        setTimeout(()=>{
          this.store.dispatch(new ClosedAlert())
        }, 3000)
      }
    })
  }

}

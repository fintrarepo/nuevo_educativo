import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as reducers from '../../reducers/reducers';
import { ToggleBlurPage, ShowNotApproved } from 'src/app/actions/platform.actions';


@Component({
  selector: 'app-not-approved',
  templateUrl: './not-approved.component.html',
  styleUrls: ['./not-approved.component.scss']
})
export class NotApprovedComponent implements OnInit {

  constructor(private store: Store<reducers.State>) { }

  ngOnInit() {
  }

  cancelAndClose() {
    this.store.dispatch(new ToggleBlurPage())
    this.store.dispatch(new ShowNotApproved(false))
  }

}

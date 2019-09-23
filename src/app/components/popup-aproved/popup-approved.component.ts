import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as reducers from '../../reducers/reducers';
import { ToggleBlurPage } from '../../actions/platform.actions';
@Component({
  selector: 'app-popup-approved',
  templateUrl: './popup-approved.component.html',
  styleUrls: ['./popup-approved.component.scss']
})
export class PopupApprovedComponent implements OnInit {

  constructor(private store: Store<reducers.State>) { }

  ngOnInit() {
    this.store.dispatch(new ToggleBlurPage())
  }

}

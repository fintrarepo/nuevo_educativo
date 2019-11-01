import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as reducers from '../../reducers/reducers';

@Component({
  selector: 'app-loading-forms',
  templateUrl: './loading-forms.component.html',
  styleUrls: ['./loading-forms.component.scss']
})
export class LoadingFormsComponent implements OnInit {

  isOpenForm$ = this.store.select(reducers.isLoadingForm)

  constructor(private store: Store<reducers.State>) { }

  ngOnInit() {
  }

}

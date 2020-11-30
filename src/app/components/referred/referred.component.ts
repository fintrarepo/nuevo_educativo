import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { OpenAlert } from 'src/app/actions/alert.actions';
import * as reducers from '../../reducers/reducers'

@Component({
  selector: 'app-referred',
  templateUrl: './referred.component.html',
  styleUrls: ['./referred.component.scss']
})
export class ReferredComponent implements OnInit {
  baseURl = "https://www.fintra.co/credito-educativo?codigo_referido=";
  code;
  fullUrl;
  constructor(private store: Store<reducers.State>) {

    this.code = localStorage.getItem('codigo_venta');

    this.fullUrl = this.baseURl + this.code;
  }

  ngOnInit() {
  }


  copy() {
    const link = document.querySelector('#url');
    const range = document.createRange();
    range.selectNode(link);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    const successful = document.execCommand('copy');
    selection.removeAllRanges();
    this.store.dispatch(new OpenAlert({
      open: true,
      title: "",
      subTitle: "URL copiada",
      type: "success"
    }))
  }

}

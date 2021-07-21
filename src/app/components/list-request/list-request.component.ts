import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { Store } from '@ngrx/store';
import * as reducers from '../../reducers/reducers';
import { GetListRequest } from 'src/app/actions/list-requests.actions';
import { shareReplay, } from 'rxjs/operators';
import { AuthService } from '../../services/auth/auth.service'

@Component({
  selector: 'app-list-request',
  templateUrl: './list-request.component.html',
  styleUrls: ['./list-request.component.scss']
})
export class ListRequestComponent implements OnInit {

  isLoading$ = this.store.select(reducers.getListRequestIsLoading).pipe(shareReplay())
  listRequest$ = this.store.select(reducers.getListRequestResponse);
  error$ = this.store.select(reducers.getListRequestError);

  credits = false;

  @Input('type') type_list: any;
  @Output() finishList =  new EventEmitter<any>();

  constructor(private store: Store<reducers.State>, public auth: AuthService) { }

  ngOnInit() {
    // this.listRequest$.subscribe(data => {
    // })
  }


  routerLink(item) {
    if (item.etapa == 0) {
      return "/app/credit-application/" + item.numero_solicitud
    } else if (item.etapa > 0) {
      // return "/app/upload/" + item.cod_neg + '/' + item.numero_solicitud
      return "/app/reconocer/" + item.cod_neg + '/' + item.numero_solicitud
    }
  }


  getTitleButton(item) {
    if (item.etapa == 0) {
      return "Formulario"
    } else if (item.etapa > 0 && item.adjuntar != 't') {
      return "Adjuntar"
    }
  }

  validateButton(item) {
    return (item.etapa == 0 || (item.etapa > 0 && item.adjuntar != 't'))
  }

  loadMore(){
    this.finishList.emit('Hola Guapo');
  }
}

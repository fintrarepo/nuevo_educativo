import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as reducers from '../../reducers/reducers';
import { GetListRequest } from 'src/app/actions/list-requests.actions';
import { shareReplay, } from 'rxjs/operators';

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

  @Input('type') type_list : any;
  
  constructor(private store: Store<reducers.State>) { }

  ngOnInit() {
    this.listRequest$.subscribe(data => {
      console.log(data)
    })
  }


  routerLink(item) {
    if (item.etapa == 0) {
      return "/app/credit-application/" + item.numero_solicitud
    } else {
      return "/"
    }
  }
}

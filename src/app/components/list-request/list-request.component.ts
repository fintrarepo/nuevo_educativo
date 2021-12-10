import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { Store } from '@ngrx/store';
import * as reducers from '../../reducers/reducers';
import { GetListRequest } from 'src/app/actions/list-requests.actions';
import { shareReplay, } from 'rxjs/operators';
import { AuthService } from '../../services/auth/auth.service'
import { UtilsService } from 'src/app/services/utils/utils.service';

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

  entidad: string=null;
  aplicaValidacionEntidad: boolean=false;

  constructor(private store: Store<reducers.State>, public auth: AuthService,  public utils: UtilsService) { }

  ngOnInit() {
    this.utils.getAplicaReconocer().subscribe(res => {
      if(res.status==200){
        if((res.data.aplica=="SI") &&(res.data.entidad=="RECONOSER")){
          this.aplicaValidacionEntidad=true;
          this.entidad="RECONOSER";
        }else{
          this.aplicaValidacionEntidad=false;
        }
      }
         
    })
    // this.listRequest$.subscribe(data => {
    // })
  }


  routerLink(item) {
    if (item.etapa_educativo == 0) {
      return "/app/credit-application/" + item.numero_solicitud
    } else if (item.etapa_educativo > 0) {
      if(this.aplicaValidacionEntidad){
        switch (this.entidad) {
          case 'RECONOSER':
            return "/app/reconocer/" + item.cod_neg + '/' + item.numero_solicitud
          break;
        
          default:
            return "/app/upload/" + item.cod_neg + '/' + item.numero_solicitud
          break;
        }
      }else{
        return "/app/upload/" + item.cod_neg + '/' + item.numero_solicitud
      }
    }
  }


  getTitleButton(item) {
    if (item.etapa_educativo == 0) {
      return "Formulario"
    } else if (item.etapa_educativo == 2 && item.adjuntar != 't') {
      return "Adjuntar"
    }
  }

  validateButton(item) {
    return (item.etapa_educativo == 0 || (item.etapa_educativo ==2 && item.adjuntar != 't'))
  }

  loadMore(){
    this.finishList.emit('Hola Guapo');
  }
}

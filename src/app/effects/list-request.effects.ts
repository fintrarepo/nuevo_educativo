import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { tap, exhaustMap, map, switchMap, catchError } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import * as reducers from '../reducers/reducers';
import { OpenAlert } from '../actions/alert.actions';

import { ListRequestService } from '../services/list-request/list-request.service';

import { GetListRequest, ListRequestsActionTypes, GetListRequestSuccess, GetListRequestError } from '../actions/list-requests.actions';

@Injectable({
    providedIn: 'root'
})
export class ListRequestEffects {


    constructor(private actions$: Actions, private store: Store<reducers.State>, private listRequest: ListRequestService) { }



    @Effect()
    GetListRequest$: Observable<Action> = this.actions$.pipe(
        ofType<GetListRequest>(ListRequestsActionTypes.GetListRequest),
        tap(v => console.log('LoginUser effect tap', v.payload)),
        map(action => action.payload),
        exhaustMap(action => {
            const request = action.credits ? this.listRequest.getLoans(action.identificacion) : this.listRequest.getRequests()
            return request.pipe(
                map(Response => {
                    return action.credits ? new GetListRequestSuccess({ requests: Response }) :
                        new GetListRequestSuccess({ requests: Response.data })
                }),
                catchError(error => of(new GetListRequestError(error)))
            )
        })
    )




    @Effect()
    GetListRequestError: Observable<Action> = this.actions$.pipe(
        ofType<GetListRequestError>(ListRequestsActionTypes.GetListRequestError),
        tap(v => console.log(v)),
        exhaustMap((error: any) => {
            return of(new OpenAlert({
                open: true,
                title: "Error",
                subTitle: error.toString(),
                type: "danger"
            }))
        })
    )





}


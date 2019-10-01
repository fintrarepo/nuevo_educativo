import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { tap, exhaustMap, map, switchMap, catchError } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import * as reducers from '../reducers/reducers';
import { OpenAlert } from '../actions/alert.actions';

import { CreditsService } from '../services/credits/credits.service';

import { SendPreApplication, PreApplicationActionTypes, SendPreApplicationSucess, SendPreApplicationError } from '../actions/credit.actions';

@Injectable({
    providedIn: 'root'
})
export class CreditEffects {


    constructor(private actions$: Actions, private store: Store<reducers.State>, private credit: CreditsService) { }



    @Effect()
    SendPreApplication$: Observable<Action> = this.actions$.pipe(
        ofType<SendPreApplication>(PreApplicationActionTypes.SendPreApplication),
        tap(v => console.log('LoginUser effect tap', v.payload)),
        map(action => action.payload),
        exhaustMap(action => {
            return this.credit.send(action).pipe(
                map(Response => {
                    return new SendPreApplicationSucess({ result: Response })
                }),
                catchError(error => of(new SendPreApplicationError(error)))
            )
        })
    )




    @Effect()
    SendPreApplicationError: Observable<Action> = this.actions$.pipe(
        ofType<SendPreApplicationError>(PreApplicationActionTypes.SendPreApplicationError),
        tap(v => console.log(v)),
        map(action => action.payload.error),
        exhaustMap((error: any) => {
            return of(new OpenAlert({
                open: true,
                title: error.title,
                subTitle: error.detail,
                type: "danger"
            }))
        })
    )





}


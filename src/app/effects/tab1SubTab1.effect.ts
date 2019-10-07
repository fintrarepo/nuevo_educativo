import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { tap, exhaustMap, map, switchMap, catchError } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import * as reducers from '../reducers/reducers';
import { OpenAlert } from '../actions/alert.actions';

import { CreditsService } from '../services/credits/credits.service';

import { SendTab1SubTab1, ETabs1SubTab1ActionsTypes, SendTSendTab1SubTab1ResponseSuccess, SendTSendTab1SubTab1ResponseError } from '../actions/tab1SubTab1.actions';
import { ToggleBlurPage } from '../actions/platform.actions';

@Injectable({
    providedIn: 'root'
})
export class Tab1SubTab1Effects {


    constructor(private actions$: Actions, private store: Store<reducers.State>, private credit: CreditsService) { }



    @Effect()
    SendTab1SubTab1$: Observable<Action> = this.actions$.pipe(
        ofType<SendTab1SubTab1>(ETabs1SubTab1ActionsTypes.SendTab1SubTab1),
        tap(v => console.log('LoginUser effect tap', v.payload)),
        map(action => action.payload),
        exhaustMap(action => {
            return this.credit.saveTab(action).pipe(
                map(Response => {
                    return new SendTSendTab1SubTab1ResponseSuccess({})
                }),
                catchError(error => of(new SendTSendTab1SubTab1ResponseError({})))
            )
        })
    )

    @Effect()
    OpenRecovery$: Observable<Action> = this.actions$.pipe(
        ofType<SendTSendTab1SubTab1ResponseSuccess>(ETabs1SubTab1ActionsTypes.SendTSendTab1SubTab1ResponseSuccess),
        switchMap(action => [
            new ToggleBlurPage(),
        ])
    )



}


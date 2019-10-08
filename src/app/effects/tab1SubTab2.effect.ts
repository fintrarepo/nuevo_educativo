import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { tap, exhaustMap, map, switchMap, catchError } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import * as reducers from '../reducers/reducers';
import { OpenAlert } from '../actions/alert.actions';

import { CreditsService } from '../services/credits/credits.service';

import { SendTab1SubTab2, ETabs1SubTab2ActionsTypes, SendTSendTab1SubTab2ResponseSuccess, SendTSendTab1SubTab2ResponseError } from '../actions/tab1SubTab2.actions';
import { ToggleBlurPage } from '../actions/platform.actions';

@Injectable({
    providedIn: 'root'
})
export class Tab1SubTab2Effects {


    constructor(private actions$: Actions, private store: Store<reducers.State>, private credit: CreditsService) { }



    @Effect()
    SendTab1SubTab1$: Observable<Action> = this.actions$.pipe(
        ofType<SendTab1SubTab2>(ETabs1SubTab2ActionsTypes.SendTab1SubTab2),
        tap(v => console.log('LoginUser effect tap', v.payload)),
        map(action => action.payload),
        exhaustMap(action => {
            return this.credit.saveTab(action).pipe(
                map(Response => {
                    return new SendTSendTab1SubTab2ResponseSuccess({})
                }),
                catchError(error => of(new SendTSendTab1SubTab2ResponseError(error)))
            )
        })
    )

    @Effect({
        dispatch: false
    })
    SendTSendTab1SubTab1ResponseSuccess$: Observable<Action> = this.actions$.pipe(
        ofType<SendTSendTab1SubTab2ResponseSuccess>(ETabs1SubTab2ActionsTypes.SendTSendTab1SubTab2ResponseSuccess),
        tap(v => {

        })
    )


    @Effect()
    SendTSendTab1SubTab1ResponseError$: Observable<Action> = this.actions$.pipe(
        ofType<SendTSendTab1SubTab2ResponseSuccess>(ETabs1SubTab2ActionsTypes.SendTSendTab1SubTab2ResponseError),
        map(err => err.payload.error),
        switchMap(error => [
            new OpenAlert({
                open: true,
                title: error.title,
                subTitle: error.detail.toString(),
                type: "danger"
            }),
        ])
    )



}


import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { tap, exhaustMap, map, switchMap, catchError } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import * as reducers from '../reducers/reducers';
import { Router, ActivatedRoute } from '@angular/router';
import { OpenAlert } from '../actions/alert.actions';

import { CreditsService } from '../services/credits/credits.service';

import { SendTab1SubTab1, ETabs1SubTab1ActionsTypes, SendTab1SubTab1ResponseSuccess, SendTab1SubTab1ResponseError } from '../actions/tab1SubTab1.actions';
import { ToggleBlurPage } from '../actions/platform.actions';
import { SelecteTab1SubTab2 } from '../actions/tabs.actions';

@Injectable({
    providedIn: 'root'
})
export class Tab1SubTab1Effects {


    constructor(private actions$: Actions,
        private store: Store<reducers.State>,
        private credit: CreditsService,
        private router: Router,
        private route: ActivatedRoute) { }



    @Effect()
    SendTab1SubTab1$: Observable<Action> = this.actions$.pipe(
        ofType<SendTab1SubTab1>(ETabs1SubTab1ActionsTypes.SendTab1SubTab1),
        tap(v => console.log('LoginUser effect tap', v.payload)),
        map(action => action.payload),
        exhaustMap(action => {
            return this.credit.saveTab(action).pipe(
                map(Response => {
                    return new SendTab1SubTab1ResponseSuccess({})
                }),
                catchError(error => of(new SendTab1SubTab1ResponseError(error)))
            )
        })
    )

    @Effect()
    SendTSendTab1SubTab1ResponseSuccess$: Observable<Action> = this.actions$.pipe(
        ofType<SendTab1SubTab1ResponseSuccess>(ETabs1SubTab1ActionsTypes.SendTab1SubTab1ResponseSuccess),
        switchMap(error => [
            new SelecteTab1SubTab2(),
            new OpenAlert({
                open: true,
                title: "Listo",
                subTitle: "Todos los cambios fueron guardados satisfactoriamente.",
                type: "success"
            }),

        ])
    )


    @Effect()
    SendTSendTab1SubTab1ResponseError$: Observable<Action> = this.actions$.pipe(
        ofType<SendTab1SubTab1ResponseError>(ETabs1SubTab1ActionsTypes.SendTab1SubTab1ResponseError),
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


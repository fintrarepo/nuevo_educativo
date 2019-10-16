import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { tap, exhaustMap, map, switchMap, catchError } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import * as reducers from '../reducers/reducers';
import { OpenAlert } from '../actions/alert.actions';

import { CreditsService } from '../services/credits/credits.service';

import { ETabs1SubTab3ActionsTypes, SendTab1SubTab3, SendTab1SubTab3ResponseSuccess, SendTab1SubTab3ResponseError } from '../actions/tab1SubTab3.actions';
import { ToggleBlurPage } from '../actions/platform.actions';
import { SelecteTab1SubTab3, SelecteTab2, SelecteTab2SubTab1 } from '../actions/tabs.actions';

@Injectable({
    providedIn: 'root'
})
export class Tab1SubTab3Effects {


    constructor(private actions$: Actions, private store: Store<reducers.State>, private credit: CreditsService) { }



    @Effect()
    SendTab1SubTab3$: Observable<Action> = this.actions$.pipe(
        ofType<SendTab1SubTab3>(ETabs1SubTab3ActionsTypes.SendTab1SubTab3),
        tap(v => console.log('LoginUser effect tap', v.payload)),
        map(action => action.payload),
        exhaustMap(action => {
            return this.credit.saveTab(action).pipe(
                map(Response => {
                    return new SendTab1SubTab3ResponseSuccess({})
                }),
                catchError(error => of(new SendTab1SubTab3ResponseError(error)))
            )
        })
    )

    @Effect()
    SendTab1SubTab3ResponseSuccess$: Observable<Action> = this.actions$.pipe(
        ofType<SendTab1SubTab3ResponseSuccess>(ETabs1SubTab3ActionsTypes.SendTab1SubTab3ResponseSuccess),
        switchMap(error => [
            new OpenAlert({
                open: true,
                title: "Listo",
                subTitle: "Todos los cambios fueron guardados satisfactoriamente.",
                type: "success"
            }),
            new SelecteTab2SubTab1()

        ])
    )

    @Effect()
    SendTab1SubTab3ResponseError$: Observable<Action> = this.actions$.pipe(
        ofType<SendTab1SubTab3ResponseError>(ETabs1SubTab3ActionsTypes.SendTab1SubTab3ResponseError),
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


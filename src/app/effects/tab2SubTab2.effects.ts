import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { tap, exhaustMap, map, switchMap, catchError } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import * as reducers from '../reducers/reducers';
import { OpenAlert } from '../actions/alert.actions';

import { CreditsService } from '../services/credits/credits.service';
import { ETabs2SubTab2ActionsTypes, SendTab2SubTab2ResponseSuccess, SendTab2SubTab2ResponseError, SendTab2SubTab2, SendTab2SubTab2ResponseNextStep, PreSendTab2SubTab2 } from '../actions/tab2SubTab2.actions';
import { SelecteTab2SubTab2, SelecteTab2SubTab1 } from '../actions/tabs.actions';
import { ShowOrHiddeApproved, ToggleBlurPage, ShowOrHiddenLoadingForm } from '../actions/platform.actions';

@Injectable({
    providedIn: 'root'
})
export class Tab2SubTab2Effects {


    constructor(private actions$: Actions, private store: Store<reducers.State>, private credit: CreditsService) { }


    @Effect()
    PreSendTab2SubTab2$: Observable<Action> = this.actions$.pipe(
        ofType<PreSendTab2SubTab2>(ETabs2SubTab2ActionsTypes.PreSendTab2SubTab2),
        tap(v => console.log('LoginUser effect tap', v.payload)),
        map(action => action.payload),
        exhaustMap(action => [
            new ToggleBlurPage(),
            new ShowOrHiddenLoadingForm(true),
            new SendTab2SubTab2(action)
        ])
    )

    @Effect()
    SendTab2SubTab2$: Observable<Action> = this.actions$.pipe(
        ofType<SendTab2SubTab2>(ETabs2SubTab2ActionsTypes.SendTab2SubTab2),
        tap(v => console.log('LoginUser effect tap', v.payload)),
        map(action => action.payload),
        exhaustMap(action => {
            return this.credit.saveTab(action).pipe(
                map(Response => {
                    return new SendTab2SubTab2ResponseSuccess(true)
                }),
                catchError(error => of(new SendTab2SubTab2ResponseError(error)))
            )
        })
    )

    @Effect()
    SendTab2SubTab2ResponseSuccess$: Observable<Action> = this.actions$.pipe(
        ofType<SendTab2SubTab2ResponseSuccess>(ETabs2SubTab2ActionsTypes.SendTab2SubTab2ResponseSuccess),
        map(v => v.payload.tabs_info),
        switchMap(action => [
            new ToggleBlurPage(),
            new ShowOrHiddenLoadingForm(false),
            new ShowOrHiddeApproved(true)
        ])

    )

    @Effect()
    SendTab2SubTab2ResponseError$: Observable<Action> = this.actions$.pipe(
        ofType<SendTab2SubTab2ResponseError>(ETabs2SubTab2ActionsTypes.SendTab2SubTab2ResponseError),
        map(err => err.payload.error),
        switchMap(error => [
            new ToggleBlurPage(),
            new ShowOrHiddenLoadingForm(false),
            new OpenAlert({
                open: true,
                title: error.title,
                subTitle: typeof error.detail == 'string' ? error.detail.toString() : error.detail.MSG,
                type: "danger"
            }),
        ])
    )

    @Effect()
    SendTab2SubTab2ResponseNextStep$: Observable<Action> = this.actions$.pipe(
        ofType<SendTab2SubTab2ResponseNextStep>(ETabs2SubTab2ActionsTypes.SendTab2SubTab2ResponseNextStep),
        switchMap(error => [
            new OpenAlert({
                open: true,
                title: "Listo",
                subTitle: "Todos los cambios fueron guardados satisfactoriamente.",
                type: "success"
            }),
            new SelecteTab2SubTab2()
        ])
    )
}


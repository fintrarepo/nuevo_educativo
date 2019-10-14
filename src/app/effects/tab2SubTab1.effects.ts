import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { tap, exhaustMap, map, switchMap, catchError } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import * as reducers from '../reducers/reducers';
import { OpenAlert } from '../actions/alert.actions';

import { CreditsService } from '../services/credits/credits.service';
import { ETabs2SubTab1ActionsTypes, SendTab2SubTab1ResponseSuccess, SendTab2SubTab1ResponseError, SendTab2SubTab1, SendTab2SubTab1ResponseNextStep } from '../actions/tab2SubTab1.actions';
import { SelecteTab2SubTab2, SelecteTab2SubTab1 } from '../actions/tabs.actions';
import { ShowOrHiddeApproved } from '../actions/platform.actions';

@Injectable({
    providedIn: 'root'
})
export class Tab2SubTab1Effects {


    constructor(private actions$: Actions, private store: Store<reducers.State>, private credit: CreditsService) { }



    @Effect()
    SendTab2SubTab1$: Observable<Action> = this.actions$.pipe(
        ofType<SendTab2SubTab1>(ETabs2SubTab1ActionsTypes.SendTab2SubTab1),
        tap(v => console.log('LoginUser effect tap', v.payload)),
        map(action => action.payload),
        exhaustMap(action => {
            return this.credit.saveTab(action).pipe(
                map(Response => {
                    return new SendTab2SubTab1ResponseSuccess(action)
                }),
                catchError(error => of(new SendTab2SubTab1ResponseError(error)))
            )
        })
    )

    @Effect()
    SendTab2SubTab1ResponseSuccess$: Observable<Action> = this.actions$.pipe(
        ofType<SendTab2SubTab1ResponseSuccess>(ETabs2SubTab1ActionsTypes.SendTab2SubTab1ResponseSuccess),
        map(v => v.payload.tabs_info),
        switchMap(action => {
            console.log(action.trabaja)
            return action.trabaja == 'S' ?
                of(new ShowOrHiddeApproved(true)) :
                of(new ShowOrHiddeApproved(true))
        })

    )

    @Effect()
    SendTab2SubTab1ResponseError$: Observable<Action> = this.actions$.pipe(
        ofType<SendTab2SubTab1ResponseError>(ETabs2SubTab1ActionsTypes.SendTab2SubTab1ResponseError),
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

    @Effect()
    SendTab2SubTab1ResponseNextStep$: Observable<Action> = this.actions$.pipe(
        ofType<SendTab2SubTab1ResponseNextStep>(ETabs2SubTab1ActionsTypes.SendTab2SubTab1ResponseNextStep),
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


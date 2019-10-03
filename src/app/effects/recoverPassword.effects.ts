import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { tap, exhaustMap, map, switchMap, catchError } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import * as reducers from '../reducers/reducers';
import { ToggleBlurPage } from '../actions/platform.actions';
import { RecoveryPasswordActionTypes, OpenRecoveryPassword, SendIdUser, SendIdUserSuccess, SendIdUserError, NextStep, SetEmailAndCelular, SendRecoveryMethod } from '../actions/recovery-password.actions';
import { AuthService } from '../services/auth/auth.service';
import { OpenAlert } from '../actions/alert.actions';


@Injectable({
    providedIn: 'root'
})
export class OpenRecoveryPasswordEffects {


    constructor(private actions$: Actions, private store: Store<reducers.State>, private auth: AuthService) { }

    @Effect()
    OpenRecovery$: Observable<Action> = this.actions$.pipe(
        ofType<OpenRecoveryPassword>(RecoveryPasswordActionTypes.OpenRecoveryPassword),
        switchMap(action => [
            new ToggleBlurPage(),
        ])
    )


    @Effect()
    SendIdRecovery$: Observable<Action> = this.actions$.pipe(
        ofType<SendIdUser>(RecoveryPasswordActionTypes.SendIdUser),
        tap(v => console.log('LoginUser effect tap', v.payload)),
        map(action => action.payload),
        exhaustMap(recovery => {
            
            return this.auth.sendIdByRecovery(recovery.identificacion.toString()).pipe(
                map(Response => Response.data),
                //tap( x => console.log( this.buildMethods(x))),
                switchMap(Response => [
                    new SetEmailAndCelular(this.buildMethods(Response )),
                    new SendIdUserSuccess()
                ]),
                catchError(error => of(new SendIdUserError(error)))
            )
        })
    )

    @Effect()
    SendIdUserSuccess$: Observable<Action> = this.actions$.pipe(
        ofType<SendIdUserSuccess>(RecoveryPasswordActionTypes.SendIdUserSuccess),
        tap(v => console.log(v)),
        switchMap(action => [
            new NextStep(),
        ])
    )

    @Effect()
    SendIdUserError$: Observable<Action> = this.actions$.pipe(
        ofType<SendIdUserError>(RecoveryPasswordActionTypes.SendIdUserError),
        map(action => action.payload),
        switchMap(error => [
            new OpenAlert({
                open: true,
                title: "Error",
                subTitle: error.error.toString(),
                type: "danger"
            }),
        ])
    )

    @Effect()
    SendRecoveryMethod: Observable<Action> = this.actions$.pipe(
        ofType<SendRecoveryMethod>(RecoveryPasswordActionTypes.SendRecoveryMethod),
        tap(v => console.log(v)),
        map(action => action.payload),
        exhaustMap(recovery => {
            
            return this.auth.sendRecoveryMethod(recovery).pipe(
                map(Response => Response.data),
                switchMap(Response => [
                   
                ]),
                catchError(error => of(new SendIdUserError(error)))
            )
        })
    )



    private buildMethods(data) {
        return [].concat.apply([],data.map(x => {
            return [
                {
                    type: "email",
                    option: x.option,
                    value: x.email
                },
                {
                    type: "celular",
                    option: x.option,
                    value: x.celular
                }
            ]
        }))
    }


}


import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Observable, of, throwError } from 'rxjs';
import { tap, map, mergeMap, exhaustMap, catchError } from 'rxjs/operators';
import { Action, } from '@ngrx/store';
import { actions, LoginUser, LoginUserError, AuthActionTypes, LoggedUser } from '../actions/auth.actions';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { OpenAlert } from '../actions/alert.actions';

@Injectable({
    providedIn: 'root'
})
export class AuthEffects {

    constructor(private actions$: Actions, private auth: AuthService, private router: Router) { }

    @Effect()
    LoginUserError$: Observable<Action> = this.actions$.pipe(
        ofType<LoginUserError>(AuthActionTypes.LoginUserError),
        tap(v => console.log('LoggedApi Error', v.payload)),
        map(action => action.payload),
        exhaustMap(action => {
            return of(new OpenAlert({
                open: true,
                title: "Error",
                subTitle: action.toString(),
                type: "danger"
            }))
        })
    )

    @Effect()
    LoginUser$: Observable<Action> = this.actions$.pipe(
        ofType<LoginUser>(AuthActionTypes.LoginUser),
        tap(v => console.log('LoginUser effect tap', v.payload)),
        map(action => action.payload),
        exhaustMap(auth => {
            return this.auth.login(auth).pipe(
                map(Response => {
                    return Response.success ? new LoggedUser(Response) : new LoginUserError(Response.error.data)
                }),
                catchError(error => of(new LoginUserError(error)))
            )
        })
    )

    @Effect({
        dispatch: false
    })
    LoggedUser$: Observable<Action> = this.actions$.pipe(
        ofType<LoggedUser>(AuthActionTypes.LoggedUser),
        tap(v => this.router.navigate(['/']))
    )
}   
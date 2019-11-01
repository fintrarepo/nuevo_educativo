import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Observable, of, throwError } from 'rxjs';
import { tap, map, mergeMap, exhaustMap, catchError, switchMap } from 'rxjs/operators';
import { Action, } from '@ngrx/store';
import { actions, LoginUser, LoginUserError, AuthActionTypes, LoggedUser, ShowAndHideChangePassword, ChangePassword, GoToDashBoard, ResestLogin } from '../actions/auth.actions';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { OpenAlert } from '../actions/alert.actions';
import { ToggleBlurPage } from '../actions/platform.actions';

@Injectable({
    providedIn: 'root'
})
export class AuthEffects {

    constructor(private actions$: Actions, private auth: AuthService, private router: Router) { }

    @Effect()
    LoginUserError$: Observable<Action> = this.actions$.pipe(
        ofType<LoginUserError>(AuthActionTypes.LoginUserError),
        tap(v => console.log('LoggedApi Error', v.payload)),
        map(action => action.payload.error),
        exhaustMap((action: any) => {
            return of(new OpenAlert({
                open: true,
                title: action.title.toString(),
                subTitle: action.detail.toString(),
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
            console.log(auth)
            return this.auth.login(auth).pipe(
                map(Response => {
                    return new LoggedUser(Response)
                }),
                catchError(error => {
                    console.log(error);
                    return of(new LoginUserError(error))
                })
            )
        })
    )

    @Effect()
    LoggedUser$: Observable<Action> = this.actions$.pipe(
        ofType<LoggedUser>(AuthActionTypes.LoggedUser),
        map(action => action.payload),
        tap(v => {
            this.auth.token = v.data.token;
            this.auth.name = v.data.name;
            this.auth.tipo_usuario = v.data.tipo_usuario;
            this.auth.cambio_clave = v.data.cambio_clave;

        }),
        exhaustMap((Response) => {
            return Response.data.cambio_clave ? of(new ShowAndHideChangePassword()) :
                of(new GoToDashBoard())
        })
    )


    @Effect()
    ShowAndHideChangePassword$: Observable<Action> = this.actions$.pipe(
        ofType<ShowAndHideChangePassword>(AuthActionTypes.ShowAndHideChangePassword),
        tap(v => console.log(v)),
        exhaustMap(() => {
            return of(new ToggleBlurPage())
        })
    )


    @Effect({
        dispatch: false
    })
    GoToDashBoard$: Observable<Action> = this.actions$.pipe(
        ofType<GoToDashBoard>(AuthActionTypes.GoToDashBoard),
        tap(v => this.router.navigate(['/app/dashboard/requests']))
    )


    @Effect()
    ChangePassword$: Observable<Action> = this.actions$.pipe(
        ofType<ChangePassword>(AuthActionTypes.ChangePassword),
        map(action => action.payload),
        tap(v => console.log(v)),
        exhaustMap((Response) => {
            return this.auth.changePassword(Response).pipe(
                switchMap(Response => [
                    new ToggleBlurPage(),
                    new GoToDashBoard(),
                    new ResestLogin()
                ]),
                catchError(error => {
                    return of(new LoginUserError(error))
                })
            )
        })
    )
}   
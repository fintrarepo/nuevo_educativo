import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { tap, exhaustMap, map, switchMap, catchError } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import * as reducers from '../reducers/reducers';
import { OpenAlert } from '../actions/alert.actions';
import { CreditsService } from '../services/credits/credits.service';
import { InfoFormRequest, PlatformActionTypes, InfoFormRequestResponse, LoadCitysResponse, LoadCitys, ToggleBlurPage, ShowNotApproved } from '../actions/platform.actions'
import { SendPreApplication, PreApplicationActionTypes, SendPreApplicationSucess, SendPreApplicationError, SendPreApplicationNotAproved } from '../actions/credit.actions';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class CreditEffects {


    constructor(private actions$: Actions, private store: Store<reducers.State>, private credit: CreditsService, private router: Router) { }



    @Effect()
    SendPreApplication$: Observable<Action> = this.actions$.pipe(
        ofType<SendPreApplication>(PreApplicationActionTypes.SendPreApplication),
        // tap(v => console.log('LoginUser effect tap', v.payload)),
        map(action => action.payload),
        exhaustMap(action => {
            return this.credit.send(action).pipe(
                map(Response => {
                    console.log(Response)
                    return Response.data.estado_sol == 'R' ?
                        new SendPreApplicationNotAproved()
                        : new SendPreApplicationSucess({ result: Response })
                }),
                catchError(error => of(new SendPreApplicationError({ ...error, redirect: false })))
            )
        })
    )




    @Effect({})
    SendPreApplicationSucess: Observable<Action> = this.actions$.pipe(
        ofType<SendPreApplicationSucess>(PreApplicationActionTypes.SendPreApplicationSucess),
        tap(v => this.router.navigate(['/'])),
        map(action => action.payload),
        exhaustMap((error: any) => [
            new OpenAlert({
                open: true,
                title: "LISTO",
                subTitle: "Su solicitud de crédito ha sido creada exitosamente.",
                type: "success"
            }),

        ])
    )

    @Effect()
    SendPreApplicationError: Observable<Action> = this.actions$.pipe(
        ofType<SendPreApplicationError>(PreApplicationActionTypes.SendPreApplicationError),
        map(action => action.payload.error),

        switchMap((error: any) => [
            new OpenAlert({
                open: true,
                title: error.title,
                subTitle: error.detail,
                type: "danger"
            })
        ])
    )


    @Effect()
    SendPreApplicationNotAproved: Observable<Action> = this.actions$.pipe(
        ofType<SendPreApplicationNotAproved>(PreApplicationActionTypes.SendPreApplicationNotAproved),
        switchMap(v => [
            new ToggleBlurPage(),
            new ShowNotApproved(true)
        ])

    )



    @Effect()
    InfoFormRequest: Observable<Action> = this.actions$.pipe(
        ofType<InfoFormRequest>(PlatformActionTypes.InfoFormRequest),
        exhaustMap(recovery => {

            return this.credit.loadInfoForm().pipe(
                tap(v => console.log(v)),
                map(Response => Response.info.data),
                //tap( x => console.log( this.buildMethods(x))),
                switchMap(data => [
                    new InfoFormRequestResponse(data)
                ]),
                // catchError(error => of(new SendIdUserError(error)))
            )
        })
    )


    @Effect()
    LoadCitys: Observable<Action> = this.actions$.pipe(
        ofType<LoadCitys>(PlatformActionTypes.LoadCitys),
        map(action => action.payload.dpto),
        exhaustMap(dpto => {

            return this.credit.loadCitys(dpto).pipe(

                map(v => v.data),
                tap(v => console.log(v)),
                exhaustMap((Response) => {
                    return of(new LoadCitysResponse(Response))
                })
            )
        })
    )



}


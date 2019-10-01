import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { tap, exhaustMap, map, switchMap, catchError } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import * as reducers from '../reducers/reducers';
import { OpenAlert } from '../actions/alert.actions';

import { CreditsService } from '../services/credits/credits.service';

import { SendSimulation, SimulationActionTypes, SendSimulationSuccess, SendSimulationError } from '../actions/simulator.actions';

@Injectable({
    providedIn: 'root'
})
export class SimulatorEffects {


    constructor(private actions$: Actions, private store: Store<reducers.State>, private credit: CreditsService) { }



    @Effect()
    SendSimulation$: Observable<Action> = this.actions$.pipe(
        ofType<SendSimulation>(SimulationActionTypes.SendSimulation),
        tap(v => console.log('LoginUser effect tap', v.payload)),
        map(action => action.payload),
        exhaustMap(action => {
            return this.credit.simulate(action).pipe(
                map(Response => {
                    return new SendSimulationSuccess({ result: Response })
                }),
                catchError(error => of(new SendSimulationError({ requests: Response })))
            )
        })
    )




    // @Effect()
    // GetListRequestError: Observable<Action> = this.actions$.pipe(
    //     ofType<GetListRequestError>(ListRequestsActionTypes.GetListRequestError),
    //     tap(v => console.log(v)),
    //     exhaustMap((error: any) => {
    //         return of(new OpenAlert({
    //             open: true,
    //             title: "Error",
    //             subTitle: error.toString(),
    //             type: "danger"
    //         }))
    //     })
    // )





}


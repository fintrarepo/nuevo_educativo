import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { tap, exhaustMap, map, switchMap } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import * as reducers from '../reducers/reducers';
import { ToggleBlurPage } from '../actions/platform.actions';
import { RecoveryPasswordActionTypes, OpenRecoveryPassword } from '../actions/recovery-password.actions';

@Injectable({
    providedIn: 'root'
})
export class OpenRecoveryPasswordEffects {
    

    constructor(private actions$: Actions, private store: Store<reducers.State>) { }

    @Effect()
    OpenRecovery$: Observable<Action> = this.actions$.pipe(
        ofType<OpenRecoveryPassword>(RecoveryPasswordActionTypes.OpenRecoveryPassword),
        switchMap(action => [
            new ToggleBlurPage(),
        ])
    )
}


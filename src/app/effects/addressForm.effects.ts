import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { tap, exhaustMap, map, switchMap } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import * as reducers from '../reducers/reducers';
import { OpenForm, AddressFormActionTypes, CleanForm, FormatAddress, ConfirmAddress, ClosedForm } from '../actions/address-form.actions';
import { OpenAlert } from '../actions/alert.actions';
import { ToggleBlurPage } from '../actions/platform.actions';

@Injectable({
    providedIn: 'root'
})
export class AddressFormEffects {

    addressFormState$ = this.store.select(reducers.getAddressFormState)

    constructor(private actions$: Actions, private store: Store<reducers.State>) { }

    @Effect()
    OpenAdressForm$: Observable<Action> = this.actions$.pipe(
        ofType<OpenForm>(AddressFormActionTypes.OpenForm),
        switchMap(action => [
            new ToggleBlurPage(),
            new CleanForm()
        ])
    )

    @Effect()
    confirmAdressForm$: Observable<Action> = this.actions$.pipe(
        ofType<ConfirmAddress>(AddressFormActionTypes.ConfirmAddress),
        exhaustMap(() => {
            return of(new FormatAddress())
        })
    )

    @Effect()
    closedAddressForm: Observable<Action> = this.actions$.pipe(
        ofType<ClosedForm>(AddressFormActionTypes.ClosedForm),
        exhaustMap(() => {
            return of(new ToggleBlurPage())
        })
    )
}


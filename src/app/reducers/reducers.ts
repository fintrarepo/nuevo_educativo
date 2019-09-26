
import { environment } from '../../environments/environment';
import { ActionReducerMap, createSelector, createFeatureSelector, ActionReducer, MetaReducer } from '@ngrx/store';
import { RouterStateUrl } from '../shared/utils';
import * as fromRouter from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';

import * as fromPlatform from '../reducers/platform.reducer';
import * as fromAuth from '../reducers/auth.reducer';
import * as fromAlert from '../reducers/alert.reducer';
import * as fromAddressForm from '../reducers/address-form.reducer';
import * as fromRecoveryPassword from '../reducers/recovery-password.reducer';


export interface State {
    platform: fromPlatform.State,
    auth: fromAuth.State,
    alert: fromAlert.State,
    addressForm: fromAddressForm.State,
    recoveryPassword: fromRecoveryPassword.State,
    router: fromRouter.RouterReducerState<RouterStateUrl>
}


export const reducers: ActionReducerMap<State | any> = {
    platform: fromPlatform.PlatformReducer,
    auth: fromAuth.AuthReducer,
    alert: fromAlert.AlertReducer,
    addressForm: fromAddressForm.AddressFormReducer,
    router: fromRouter.routerReducer,
    recoveryPassword: fromRecoveryPassword.RecoveryPasswordReducer,
}


export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
    return function (state: State, action: any): State {
        console.log('state', state)
        console.log('action', action)
        return reducer(state, action)
    }
}

export const metaReducers: MetaReducer<State>[] = !environment.production
    ? [logger, storeFreeze]
    : [];


export const getPlatformState = createFeatureSelector<fromPlatform.State>('platform');
export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getAddressFormState = createFeatureSelector<fromAddressForm.State>('addressForm');
export const getAlertState = createFeatureSelector<fromAlert.State>('alert');
export const getRecoveryPasswordState = createFeatureSelector<fromRecoveryPassword.State>('recovery');


//PLATFORM

export const getPlatform = createSelector(
    getPlatformState,
    fromPlatform.getPlatformState
)

export const platformIsBlur = createSelector(
    getPlatformState,
    fromPlatform.getPlatformIsBlur
)




//AUTH SELECTORS
export const getAuth = createSelector(
    getAuthState,
    fromAuth.getAuthState
)


export const getAuthLoading = createSelector(
    getAuthState,
    fromAuth.getAuthLoading
)


export const getAuthError = createSelector(
    getAuthState,
    fromAuth.getAuthError
)



//ALERT SELECTORS

export const getAlert = createSelector(
    getAlertState,
    fromAlert.getAlertState
)

export const getAlertOpen = createSelector(
    getAlertState,
    fromAlert.getAlertIsOpen
)

export const getAlertType = createSelector(
    getAlertState,
    fromAlert.getAlertType
)

export const getAlertTitle = createSelector(
    getAlertState,
    fromAlert.getAlertTitle
)

export const getAlertSubTitle = createSelector(
    getAlertState,
    fromAlert.getAlertSubTitle
)





//ADDRES FORM
export const getAddressForm = createSelector(
    getAddressFormState,
    fromAddressForm.getAddressFormState
)
export const addressFormIsVisile = createSelector(
    getAddressFormState,
    fromAddressForm.getAddressFormVisible
)


//RECOVERY PASSWORD

export const getRecoveryState = createSelector(
    getRecoveryPasswordState,
    fromRecoveryPassword.getRecoverPasswordState
)

export const getRecoveryIsOpen = createSelector(
    getRecoveryPasswordState,
    fromRecoveryPassword.getRecoveryPasswordIsOpen
)

export const getRecoveryCurrentStep = createSelector(
    getRecoveryPasswordState,
    fromRecoveryPassword.getRecoveryPasswordCurrentStep
)

export const getRecoveryError = createSelector(
    getRecoveryPasswordState,
    fromRecoveryPassword.getRecoveryPasswordError
)






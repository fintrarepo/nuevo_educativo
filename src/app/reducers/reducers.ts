
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
import * as fromListRequests from '../reducers/list-requets.reducer';
import * as fromCredits from '../reducers/simulation.reducer';



export interface State {
    platform: fromPlatform.State,
    auth: fromAuth.State,
    alert: fromAlert.State,
    recovery: fromRecoveryPassword.State,
    addressForm: fromAddressForm.State,
    request: fromListRequests.State,
    credits: fromCredits.State,
    router: fromRouter.RouterReducerState<RouterStateUrl>
}


export const reducers: ActionReducerMap<State | any> = {
    platform: fromPlatform.PlatformReducer,
    auth: fromAuth.AuthReducer,
    alert: fromAlert.AlertReducer,
    recovery: fromRecoveryPassword.RecoveryPasswordReducer,
    addressForm: fromAddressForm.AddressFormReducer,
    request: fromListRequests.listRequestReducer,
    credits: fromCredits.SimulatorReducer,
    router: fromRouter.routerReducer,
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
export const getListRequestState = createFeatureSelector<fromListRequests.State>('request');
export const getSimulatorState = createFeatureSelector<fromCredits.State>('credits');


//PLATFORM

export const getPlatform = createSelector(
    getPlatformState,
    fromPlatform.getPlatformState
)

export const platformIsBlur = createSelector(
    getPlatformState,
    fromPlatform.getPlatformIsBlur
)

export const platformDataForm = createSelector(
    getPlatformState,
    fromPlatform.getPlatformDataForm
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


export const getAuthIsOpenChangePassword= createSelector(
    getAuthState,
    fromAuth.getIsOpenChangePassword
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


//LIST REQUESTS
export const getListRequest = createSelector(
    getListRequestState,
    fromListRequests.getListRequestsState
)

export const getListRequestResponse = createSelector(
    getListRequestState,
    fromListRequests.getListRequets
)

export const getListRequestIsLoading = createSelector(
    getListRequestState,
    fromListRequests.getListRequetsIsLoading
)

export const getListRequestError = createSelector(
    getListRequestState,
    fromListRequests.getListRequetsError
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
    fromRecoveryPassword.getRecoveryPasswordState
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

export const getRecoveryMethods = createSelector(
    getRecoveryPasswordState,
    fromRecoveryPassword.getRecoveryPasswordMethods
)


//CREDITS

export const getSimulatorStateObject = createSelector(
    getSimulatorState,
    fromCredits.getSimulatorState
)

export const getSimulatorResult = createSelector(
    getSimulatorState,
    fromCredits.getSimulatorSuccess
)


export const getSimulatorError = createSelector(
    getSimulatorState,
    fromCredits.getSimulatorError
)






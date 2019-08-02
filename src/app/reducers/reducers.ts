// import { tabs1Reducer, tabs2Reducer, tabs1Subtab1Reducer, tabs1Subtab2Reducer, tabs1Subtab3Reducer } from './tabs.reducer';





// export const reducers = {
//     tab1: tabs1Reducer,
//     tab1Subtab1: tabs1Subtab1Reducer,
//     tab1Subtab2: tabs1Subtab2Reducer,
//     tab1Subtab3: tabs1Subtab3Reducer,
//     tab2: tabs2Reducer,
// }

import { environment } from '../../environments/environment';
import { ActionReducerMap, createSelector, createFeatureSelector, ActionReducer, MetaReducer } from '@ngrx/store';
import { RouterStateUrl } from '../shared/utils';
import * as fromRouter from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';


import * as fromAuth from '../reducers/auth.reducer';
import * as fromAlert from '../reducers/alert.reducer';


export interface State {
    auth: fromAuth.State,
    alert: fromAlert.State,
    router: fromRouter.RouterReducerState<RouterStateUrl>
}


export const reducers: ActionReducerMap<State | any> = {
    auth: fromAuth.AuthReducer,
    alert: fromAlert.AlertReducer,
    router: fromRouter.routerReducer
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



export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getAlertState = createFeatureSelector<fromAlert.State>('alert');


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

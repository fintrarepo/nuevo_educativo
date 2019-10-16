import { Action } from '@ngrx/store';



export enum PlatformActionTypes {
    ToggleBlurPage = '[Platform] TOGGLE_BLUR_PAGE',

    InfoFormRequest = '[Platform] InfoFormRequest',
    InfoFormRequestResponse = '[Platform] InfoFormRequestResponse',

    LoadCitys = '[Platform] LoadCitys',
    LoadCitysResponse = '[Platform] LoadCitysResponse',

    ShowOrHiddeApproved = '[Platform] ShowOrHiddeApproved',

    SetCurrentBussinees = '[Platform] SetCurrentBussinees',
}



export class ToggleBlurPage implements Action {
    readonly type = PlatformActionTypes.ToggleBlurPage;
}

export class InfoFormRequest implements Action {
    readonly type = PlatformActionTypes.InfoFormRequest;
}

export class InfoFormRequestResponse implements Action {
    readonly type = PlatformActionTypes.InfoFormRequestResponse;
    constructor(public payload: any) { }
}

export class LoadCitys implements Action {
    readonly type = PlatformActionTypes.LoadCitys;
    constructor(public payload: {
        dpto: String
    }) { }
}

export class LoadCitysResponse implements Action {
    readonly type = PlatformActionTypes.LoadCitysResponse;
    constructor(public payload: any) { }
}


export class ShowOrHiddeApproved implements Action {
    readonly type = PlatformActionTypes.ShowOrHiddeApproved;
    constructor(public payload: boolean) { }
}

export class SetCurrentBussinees implements Action {
    readonly type = PlatformActionTypes.SetCurrentBussinees;
    constructor(public payload: any) { }
}





export type actions = ToggleBlurPage | InfoFormRequest | InfoFormRequestResponse | LoadCitys | LoadCitysResponse | ShowOrHiddeApproved | SetCurrentBussinees;




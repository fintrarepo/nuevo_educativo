import { Action } from '@ngrx/store';
import { actions } from './auth.actions';
import { IPreApplication } from '../models/credits.model';

// SIMULATION
export enum PreApplicationActionTypes {
    SendPreApplication = '[SimulationAction] SEND_PREAPPLICATION',
    SendPreApplicationSucess = '[SimulationAction] SEND_PREAPPLICATION_SUCCESS',
    SendPreApplicationError = '[SimulationAction] SEND_PREAPPLICATION_ERROR',
    SendPreApplicationNotAproved = '[SimulationAction] SendPreApplicationNotAproved',
}


export class SendPreApplication implements Action {
    readonly type = PreApplicationActionTypes.SendPreApplication;
    constructor(public payload: IPreApplication) { }
}

export class SendPreApplicationSucess implements Action {
    readonly type = PreApplicationActionTypes.SendPreApplicationSucess;
    constructor(public payload: any) { }
}

export class SendPreApplicationError implements Action {
    readonly type = PreApplicationActionTypes.SendPreApplicationError;
    constructor(public payload: any) { }
}

export class SendPreApplicationNotAproved implements Action {
    readonly type = PreApplicationActionTypes.SendPreApplicationNotAproved;
    constructor(public payload: any) { }
}




export type actions =
    SendPreApplication |
    SendPreApplicationSucess |
    SendPreApplicationError |
    SendPreApplicationNotAproved;



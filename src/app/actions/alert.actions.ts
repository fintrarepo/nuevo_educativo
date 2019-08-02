import { Action } from '@ngrx/store';
import { User, IUser } from '../models/user.models';
import { actions } from './auth.actions';
import { IAlert } from '../models/alert.model';


export enum AlertActionTypes {
    OpenAlert = '[Alert] OPEN_ALERT',
    ClosedAlert = '[Alert] CLOSED_ALERT'
}



export class OpenAlert implements Action {
    readonly type = AlertActionTypes.OpenAlert;
    constructor(public payload: IAlert) { }
}


export class ClosedAlert implements Action {
    readonly type = AlertActionTypes.ClosedAlert;
}

export type actions = OpenAlert | ClosedAlert;




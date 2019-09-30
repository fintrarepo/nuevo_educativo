import { Action } from '@ngrx/store';
import { ITab1 } from '../models/tabs.model';

export enum ETabs1ActionsTypes {
    SendTab1 = '[Tabs] SendTab1',
    SendTSendTab1ResponseSuccess = '[Tabs] SendTab1ResponseSuccess',
    SendTab1ResponseError = '[Tabs] SendTab1ResponseError',
}




//TAB 1

export class SendTab1 implements Action {
    public readonly type = ETabs1ActionsTypes.SendTab1;
    constructor(public payload: ITab1) { }
}

export class SendTSendTab1ResponseSuccess implements Action {
    public readonly type = ETabs1ActionsTypes.SendTSendTab1ResponseSuccess;
    constructor(public payload: ITab1) { }
}

export class SendTab1ResponseError implements Action {
    public readonly type = ETabs1ActionsTypes.SendTab1ResponseError;
    constructor(public payload: ITab1) { }
}



export type actions = SendTab1 |
    SendTSendTab1ResponseSuccess |
    SendTab1ResponseError;



import { Action } from '@ngrx/store';
import { ITab1SubTab1, ITab1SubTab1RequestData } from '../models/tabs.model';




export enum ETabs1SubTab1ActionsTypes {
    SendTab1SubTab1 = '[Tabs] SendTab1SubTab1',
    SendTSendTab1SubTab1ResponseSuccess = '[Tabs] SendTSendTab1SubTab1ResponseSuccess',
    SendTSendTab1SubTab1ResponseError = '[Tabs] SendTSendTab1SubTab1ResponseError',
}




//TAB 1

export class SendTab1SubTab1 implements Action {
    public readonly type = ETabs1SubTab1ActionsTypes.SendTab1SubTab1;
    constructor(public payload: ITab1SubTab1RequestData) { }
}

export class SendTSendTab1SubTab1ResponseSuccess implements Action {
    public readonly type = ETabs1SubTab1ActionsTypes.SendTSendTab1SubTab1ResponseSuccess;
    constructor(public payload: any) { }
}

export class SendTSendTab1SubTab1ResponseError implements Action {
    public readonly type = ETabs1SubTab1ActionsTypes.SendTSendTab1SubTab1ResponseError;
    constructor(public payload: any) { }
}



export type actions = SendTab1SubTab1 |
    SendTSendTab1SubTab1ResponseSuccess |
    SendTSendTab1SubTab1ResponseError;



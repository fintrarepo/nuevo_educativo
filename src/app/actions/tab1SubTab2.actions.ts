import { Action } from '@ngrx/store';
import { ITab1SubTab2, ITab1SubTab1RequestData } from '../models/tabs.model';




export enum ETabs1SubTab2ActionsTypes {
    SendTab1SubTab2 = '[Tabs] SendTab1SubTab2',
    SendTSendTab1SubTab2ResponseSuccess = '[Tabs] SendTSendTab1SubTab2ResponseSuccess',
    SendTSendTab1SubTab2ResponseError = '[Tabs] SendTSendTab1SubTab2ResponseError',
}




//TAB 1

export class SendTab1SubTab2 implements Action {
    public readonly type = ETabs1SubTab2ActionsTypes.SendTab1SubTab2;
    constructor(public payload: ITab1SubTab1RequestData) { }
}

export class SendTSendTab1SubTab2ResponseSuccess implements Action {
    public readonly type = ETabs1SubTab2ActionsTypes.SendTSendTab1SubTab2ResponseSuccess;
    constructor(public payload: any) { }
}

export class SendTSendTab1SubTab2ResponseError implements Action {
    public readonly type = ETabs1SubTab2ActionsTypes.SendTSendTab1SubTab2ResponseError;
    constructor(public payload: any) { }
}



export type actions = SendTab1SubTab2 |
    SendTSendTab1SubTab2ResponseSuccess |
    SendTSendTab1SubTab2ResponseError;


